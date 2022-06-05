import renderer from "react-test-renderer";
import { H4 } from "../Title";

it("H4: Virtual DOM snapshot", () => {
	const tree = renderer.create(<H4 />).toJSON();
	expect(tree).toMatchSnapshot();
});
