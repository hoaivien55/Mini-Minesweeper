import {
	render,
	screen,
	act,
	waitFor,
	fireEvent,
} from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import Welcome from "..";
import { StoreProvider } from "../../../store";

// mock react router: useNavigate
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockedUsedNavigate,
}));

test("Welcome: renders page", async () => {
	act(() => {
		render(
			<BrowserRouter>
				<StoreProvider>
					<Welcome />
				</StoreProvider>
			</BrowserRouter>
		);
	});
	await waitFor(() =>
		expect(screen.getByText("Mini Minesweeper")).toBeInTheDocument()
	);
});

test("Welcome: chagne level", async () => {
	act(() => {
		render(
			<BrowserRouter>
				<StoreProvider>
					<Welcome />
				</StoreProvider>
			</BrowserRouter>
		);
	});
	let selectElement = screen.getByDisplayValue("Beginner");
	fireEvent.change(selectElement, { target: { value: 2 } });
	selectElement = screen.getByDisplayValue("Advantage");

	expect(selectElement).toBeInTheDocument();
});

test("Welcome: submit form", async () => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () =>
				Promise.resolve({
					msg: "success",
					data: [{"test": 1}],
				}),
		})
	);
	act(() => {
		render(
			<BrowserRouter>
				<StoreProvider>
					<Welcome />
				</StoreProvider>
			</BrowserRouter>
		);
	});
	let submitButton = screen.getByDisplayValue("Start");
	fireEvent.click(submitButton);
	jest.clearAllMocks();
    await waitFor(() => expect(mockedUsedNavigate).toBeCalledTimes(1))
});
