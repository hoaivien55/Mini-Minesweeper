const SQUARE_TYPES = {
	FLAG: "flag",
	BOOM: "boom",
	EMPTY: "empty",
	NUM: "num",
	CLOSE: "close",
	OPEN: "open"
};

const generateGameMap = (data, size) => {
	const matrix = [];
	// create matrix
	for (let y = 0; y < size; y++) {
		const row = new Array(size)
			.fill({})
			.map((_) => ({
				type: SQUARE_TYPES.EMPTY,
				status: SQUARE_TYPES.CLOSE,
				num: 0,
				flag: false
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

export { SQUARE_TYPES, generateGameMap};
// console.table(generateGameMap(testData2, 16));
