import renderer from "react-test-renderer";
import Select from "../Select";

it("Select: Virtual DOM snapshot", () => {
	const tree = renderer.create(<Select />).toJSON();
	expect(tree).toMatchSnapshot();
});
