import { render } from "@testing-library/react";

import { StoreProvider, Store } from "..";

const defaultState = {
	levelSelected: "Beginer",
	matrix: [],
	rawMines: [],
	levels: [],
};

const customRender = (ui, { providerProps, ...renderOptions }) => {
	return render(
		<StoreProvider initialState={providerProps}>{ui}</StoreProvider>,
		renderOptions
	);
};

test("StoreProvider: get appState", async () => {
	const providerProps = defaultState;
    const fn = jest.fn()
	customRender(
		<Store.Consumer>
			{(value) => fn(value.appState.levelSelected)}
		</Store.Consumer>,
		{ providerProps }
	);
    expect(fn.mock.calls[0][0]).toBe(defaultState.levelSelected)
});
