import { CHANGE_GAME_LEVEL } from "../store/actions";

const SQUARE_TYPES = {
	FLAG: "flag",
	BOOM: "boom",
	EMPTY: "empty",
	NUM: "num",
	CLOSE: "close",
	OPEN: "open",
};

const CACHE_GAME_KEY = "minisweeper";

const generateGameMap = (data, size) => {
	const matrix = [];
	// create matrix
	for (let y = 0; y < size; y++) {
		const row = new Array(size).fill({}).map((_) => ({
			type: SQUARE_TYPES.EMPTY,
			status: SQUARE_TYPES.CLOSE,
			num: 0,
			flag: false,
		}));
		matrix.push(row);
	}
	// add mines
	for (let mines of data) {
		const { x, y } = mines;
		matrix[y][x].type = SQUARE_TYPES.BOOM;
		matrix[y][x].num = -1;
	}
	// add num
	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			let count = 0;
			for (let m = -1; m <= 1; m++) {
				if (y + m < 0) {
					m++;
				}
				if (y + m > size - 1) {
					break;
				}
				for (let n = -1; n <= 1; n++) {
					if (x + n < 0) {
						n++;
					}
					if (x + n > size - 1) {
						break;
					}
					if (
						!(m === 0 && n === 0) &&
						matrix[y + m][x + n].type === SQUARE_TYPES.BOOM
					) {
						count++;
					}
				}
			}
			if (matrix[y][x].type !== SQUARE_TYPES.BOOM && count > 0) {
				matrix[y][x].num = count;
				matrix[y][x].type = SQUARE_TYPES.NUM;
			}
		}
	}
	return matrix;
};

const cacheGameInfo = (info) => {
	sessionStorage.setItem(CACHE_GAME_KEY, JSON.stringify(info));
};

const getCacheGameInfo = () => {
	const cache = sessionStorage.getItem(CACHE_GAME_KEY);
	if (cache) {
		return JSON.parse(cache);
	}
	return null;
};

const getLevelSelectedObj = (levels, levelSelected, dispatch) => {
	let _levelSelected = 1;
	if (levelSelected) {
		_levelSelected = levelSelected;
	} else {
		const info = getCacheGameInfo();
		if (info) {
			_levelSelected = info.levelSelected || 1;
			dispatch({
				type: CHANGE_GAME_LEVEL,
				payload: {levelSelected: _levelSelected}
			});
		}
	}
	return levels.find((level) => level.id === parseInt(_levelSelected));
};

export {
	SQUARE_TYPES,
	generateGameMap,
	cacheGameInfo,
	getCacheGameInfo,
	getLevelSelectedObj,
};
// console.table(generateGameMap(testData2, 16));
