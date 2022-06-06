import React, { createContext, useReducer } from "react";
// import { testData } from "../utils";

import reducer from "./reducer";
export const Store = createContext("");

const defaultState = {
	userName: "Adam",
	levelSelected: null,
	matrix: [],
	rawMines: [],
	levels: [
		{
			size: 9,
			mines: 10,
			id: 1,
			name: "Beginner",
		},
		{
			size: 16,
			mines: 40,
			id: 2,
			name: "Advantage",
		},
	],
};

export function StoreProvider({ children, initialState = defaultState }) {
	const [appState, dispatch] = useReducer(reducer, initialState);
	const value = { appState, dispatch };
	// console.log(appState);
	return <Store.Provider value={value}>{children}</Store.Provider>;
}
