import renderer from "react-test-renderer";
import { WelcomeContainerStyle, WelComeHeaderStyle } from "../WelcomeStyle";

it("WelcomeContainerStyle: Virtual DOM snapshot", () => {
	const tree = renderer.create(<WelcomeContainerStyle />).toJSON();
	expect(tree).toMatchSnapshot();
});

it("WelComeHeaderStyle: Virtual DOM snapshot", () => {
	const tree = renderer.create(<WelComeHeaderStyle />).toJSON();
	expect(tree).toMatchSnapshot();
});
