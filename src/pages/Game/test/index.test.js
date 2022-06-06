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
import { mines9x9, defaultState, board9x9 } from "./data";

// mock react router: useNavigate
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockedUsedNavigate,
}));



beforeEach(() => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () =>
				Promise.resolve({
					msg: "success",
					data: mines9x9,
				}),
		})
	);
})
afterEach(() => {
	global.fetch.mockClear();
});

afterAll(() => {
	jest.clearAllMocks();
})

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
	await waitFor(() => {
		const boxs = document.querySelectorAll(".close");
		fireEvent.click(boxs[2]);
		expect(screen.getByText(/You lost/)).toBeInTheDocument();
	});
});

test("Game: click empty square", async () => {
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
		fireEvent.click(boxs[0]);
		expect(boxs[9].classList.toString()).toContain("empty");
		expect(boxs[18].classList.toString()).toContain("empty");
		expect(boxs[19].classList.toString()).toContain("empty");
		expect(boxs[20].classList.toString()).toContain("empty");
	});
});

test("Game: play win game", async () => {
	act(() => {
		render(
			<BrowserRouter>
				<StoreProvider initialState={defaultState}>
					<Game />
				</StoreProvider>
			</BrowserRouter>
		);
	});
	let boxs;
	await waitFor(() => {
		boxs = document.querySelectorAll(".close");
	});
	await waitFor(() => {
		for (let y = 0; y < 9; y++) {
			for (let x = 0; x < 9; x++) {
				const cellPos = y * 9 + x;
				if (
					board9x9[y][x] !== -1 &&
					boxs[cellPos].classList.toString().includes("close")
				) {
					fireEvent.click(boxs[cellPos]);
				}
			}
		}
		expect(screen.getByText(/You won/)).toBeInTheDocument();
	});
});
