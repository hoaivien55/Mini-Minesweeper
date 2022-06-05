import renderer from "react-test-renderer";
import Input from "../Input";

it("Input: Virtual DOM snapshot", () => {
	const tree = renderer.create(<Input />).toJSON();
	expect(tree).toMatchSnapshot();
});
