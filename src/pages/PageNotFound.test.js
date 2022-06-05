import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

import PageNotFound from "./PageNotFound";

it("PageNotFound: Virtual DOM snapshot", () => {
	const tree = renderer
		.create(
			<BrowserRouter>
				<PageNotFound />
			</BrowserRouter>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
