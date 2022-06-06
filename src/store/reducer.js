import { cacheGameInfo } from "../utils";
import { FETCH_DATA, CHANGE_GAME_LEVEL } from "./actions";

function reducer(state, action) {
	switch (action.type) {
		case FETCH_DATA:
			// console.log(FETCH_DATA);
			return { ...state, rawMines: action.payload };
		case CHANGE_GAME_LEVEL:
			// console.log(CHANGE_GAME_LEVEL);
			cacheGameInfo(action.payload);
			return { ...state, ...action.payload };
		default:
			return state;
	}
}

export default reducer;
