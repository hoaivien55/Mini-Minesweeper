import renderer from "react-test-renderer";
import Container from "../Container";

it("Container: Virtual DOM snapshot", () => {
	const tree = renderer.create(<Container />).toJSON();
	expect(tree).toMatchSnapshot();
});

it("Container: change props", () => {
	const tree = renderer
		.create(
			<Container
				width="1px"
				minWidth="100px"
				minHeight="101px"
				padding="10px"
				backgroundColor="red"
			/>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
