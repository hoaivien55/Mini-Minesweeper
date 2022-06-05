import renderer from "react-test-renderer";
import Label from "../Label";

it("Label: Virtual DOM snapshot", () => {
	const tree = renderer.create(<Label />).toJSON();
	expect(tree).toMatchSnapshot();
});
