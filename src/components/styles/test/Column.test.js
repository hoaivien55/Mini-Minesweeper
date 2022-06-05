import renderer from "react-test-renderer";
import Column from "../Column";

it("Column: Virtual DOM snapshot", () => {
	const tree = renderer.create(<Column />).toJSON();
	expect(tree).toMatchSnapshot();
});

it("Column: change props", () => {
	const tree = renderer
		.create(<Column flexGrow="2" justifyContent="start" alignItems="right" />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
