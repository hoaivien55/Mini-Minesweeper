import styled from "styled-components";

const Input = styled.input`
    width: 100%;
	border-radius: 5px;
	border: 1px solid #727a7045;
	font-size: 20px;
	padding: 5px;
	outline: none;
    transition: box-shadow 0.5s;
	&:hover {
		box-shadow: 0.2rem 0.8rem 1.6rem #d9d9d9;
	}
    &[type="submit"] {
        color: red;
        background: #a4f5fd24;
        cursor: pointer;
        font-weight: bold;
    }
`;

export default Input;
