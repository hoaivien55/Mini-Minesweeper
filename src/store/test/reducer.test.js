import { CHANGE_GAME_LEVEL, FETCH_DATA } from "../actions";
import reducer from "../reducer";

test("reducer: FETCH_DATA", () => {
	const state = reducer({ a: 1 }, { type: FETCH_DATA, payload: 1 });
	expect(state.rawMines).toBe(1);
});

test("reducer: CHANGE_GAME_LEVEL", () => {
	const state = reducer(
		{ a: 1 },
		{ type: CHANGE_GAME_LEVEL, payload: { levelSelected: 2 } }
	);
	expect(state.levelSelected).toBe(2);
});

test("reducer: not found actions", () => {
	const state = reducer(
		{ a: 1 },
		{ type: "NOFOUND", payload: { levelSelected: 2 } }
	);
	expect(Object.keys(state).length).toBe(1);
	expect(Object.keys(state)[0]).toBe("a");
});