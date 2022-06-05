import {
	render,
	screen,
	act,
	waitFor,
	fireEvent,
} from "@testing-library/react";
import renderer from "react-test-renderer";

import { BrowserRouter } from "react-router-dom";
import Game from "..";
import { StoreProvider } from "../../../store";
import { mines9x9, defaultState } from "./data";

// mock react router: useNavigate
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockedUsedNavigate,
}));

test("Game: Virtual DOM snapshot", () => {
	const tree = renderer
		.create(
			<BrowserRouter>
				<StoreProvider initialState={defaultState}>
					<Game />
				</StoreProvider>
			</BrowserRouter>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

test("Game: renders page", async () => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () =>
				Promise.resolve({
					msg: "success",
					data: mines9x9,
				}),
		})
	);
	act(() => {
		render(
			<BrowserRouter>
				<StoreProvider initialState={defaultState}>
					<Game />
				</StoreProvider>
			</BrowserRouter>
		);
	});
	await waitFor(() => {
		const boxs = document.querySelectorAll(".close");
		expect(boxs.length).toBe(81);
	});
});


test("Game: click boom", async () => {
	act(() => {
		render(
			<BrowserRouter>
				<StoreProvider initialState={defaultState}>
					<Game />
				</StoreProvider>
			</BrowserRouter>
		);
	});
    jest.clearAllMocks();
	await waitFor(() => {
		const boxs = document.querySelectorAll(".close");
		fireEvent.click(boxs[2])
        expect(screen.getByText(/You lost/)).toBeInTheDocument()
	});
});

// .....