import styled from "styled-components";

const Button = styled.button`
	min-width: 120px;
	background: #65dfa1;
	border: none;
	height: 30px;
	border-radius: 12px;
	color: white;
	font-weight: bold;
	text-transform: uppercase;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

export { Button };
