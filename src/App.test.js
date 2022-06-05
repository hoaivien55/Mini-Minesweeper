import { render, screen, act, waitFor } from "@testing-library/react";
import { BrowserRouter, Router } from "react-router-dom";
import {createMemoryHistory} from 'history'

import App from "./App";

test("renders home page", async () => {
	act(() => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
	});
	await waitFor(() => expect(screen.getByText('Mini Minesweeper' )).toBeInTheDocument())
});

test("renders game page", async () => {
	const history = createMemoryHistory();
	history.push("/game");

	act(() => {
		render(
			<Router location={history.location} navigator={history}>
				<App />
			</Router>
		);
	});
	await waitFor(() => expect(screen.getByText('00:00:00')).toBeInTheDocument())
});