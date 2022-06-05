import renderer from "react-test-renderer";
import styled from "styled-components";

import { center } from "../sharecss";

const Button = styled.button`
	${center}
`;

it("sharecss: Virtual DOM snapshot", () => {
	const tree = renderer.create(<Button />).toJSON();
	expect(tree).toMatchSnapshot();
});
