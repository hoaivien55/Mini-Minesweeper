// import {testData2, testData} from '../utils'
async function fetchMines({ size, mines }) {
	const path = `${process.env.REACT_APP_ROOT_API}/getMines?size=${size}&mines=${mines}`;
	try {
		const response = await fetch(path);
		const resData = await response.json();
		const { msg, data } = resData;
		if (msg === "success") {
			return data;
		}
		//  else {
		// 	console.log("ошибка FETCH_DATA");
		// }
	} catch (e) {
		// console.log("FETCH_DATA", e);
	}
	// console.log("call api")
	return [];
}

export { fetchMines };
