import { generateGameMap } from "..";

const mines9x9 = [
	{ x: 5, y: 0 },
	{ x: 6, y: 8 },
	{ x: 2, y: 0 },
	{ x: 1, y: 6 },
	{ x: 1, y: 5 },
	{ x: 7, y: 8 },
	{ x: 4, y: 8 },
	{ x: 5, y: 6 },
	{ x: 6, y: 0 },
	{ x: 2, y: 6 },
];

const game9x9 = [
	[0, 1, -1, 1, 1, -1, -1, 1, 0],
	[0, 1, 1, 1, 1, 2, 2, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[1, 1, 1, 0, 0, 0, 0, 0, 0],
	[2, -1, 3, 1, 1, 1, 1, 0, 0],
	[2, -1, -1, 1, 1, -1, 1, 0, 0],
	[1, 2, 2, 2, 2, 3, 3, 2, 1],
	[0, 0, 0, 1, -1, 2, -1, -1, 1],
];

// const convertMap = (matrix, size) => {
// 	for (let y = 0; y < size; y++) {
// 		for (let x = 0; x < size; x++) {
// 			matrix[y][x] = matrix[y][x].num;
// 		}
// 	}
// 	return JSON.stringify(matrix, null, "\t");
// };

test("generateGameMap: generate map 9x9", () => {
	const matrix = generateGameMap(mines9x9, 9);
	let isMapValue = true;
	for (let y = 0; y < 9; y++) {
		for (let x = 0; x < 9; x++) {
			if (matrix[y][x].num !== game9x9[y][x]) {
				isMapValue = false;
				break;
			}
			if (!isMapValue) {
				break;
			}
		}
	}
	expect(isMapValue).toBeTruthy();
});
