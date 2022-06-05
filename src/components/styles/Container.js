import styled from "styled-components";

import { center } from "./sharecss";

const Container = styled.div`
	${center}
	margin: 0 auto;
	width: ${(props) => props.width || "auto"};
	min-width: ${(props) => props.minWidth || "300px"};
	min-height: ${(props) => props.minHeight || "200px"};
	padding: ${(props) => props.padding || "20px;"};
	background-color: ${(props) => props.backgroundColor || "white"};
`;

export default Container;
