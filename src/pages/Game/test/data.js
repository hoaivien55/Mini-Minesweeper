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

const board9x9 = [
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

const defaultState = {
	userName: "Adam",
	levelSelected: 1,
	matrix: [],
	rawMines: mines9x9,
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

export { mines9x9, board9x9, defaultState };
