import renderer from "react-test-renderer";
import Row from "../Row";

it("Row: Virtual DOM snapshot", () => {
	const tree = renderer.create(<Row />).toJSON();
	expect(tree).toMatchSnapshot();
});

it("Row: change props", () => {
	const tree = renderer
		.create(<Row justifyContent="start" alignItems="end" padding="10px" />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
