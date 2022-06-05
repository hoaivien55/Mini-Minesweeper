import renderer from "react-test-renderer";
import Form from "../Form";

it("Form: Virtual DOM snapshot", () => {
	const tree = renderer.create(<Form />).toJSON();
	expect(tree).toMatchSnapshot();
});
