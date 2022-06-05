import styled from "styled-components";

const Row = styled.div`
	display: flex;
	justify-content: ${(props) => props.justifyContent || "center"};
    align-items: ${(props) => props.alignItems || "center"};
    padding: ${(props) => props.padding || "0px"};
`;

export default Row;