import { fetchMines } from "..";

test("fetchMines: succeed", async () => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () =>
				Promise.resolve({
					msg: "success",
					data: "Testing something!",
				}),
		})
	);
	const data = await fetchMines({ size: 9, mines: [] });
	expect(data).toBe("Testing something!");
});

test("fetchMines: failed", async () => {
	global.fetch = jest.fn(() => Promise.reject("API is down"));
	const data = await fetchMines({ size: 9, mines: [] });
	expect(Array.isArray(data)).toBeTruthy();
	expect(data.length).toBe(0);
});
