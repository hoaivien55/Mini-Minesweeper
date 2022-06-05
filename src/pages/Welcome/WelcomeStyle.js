import styled from "styled-components";
import { Container, Row } from "../../components/styles";

const WelcomeContainerStyle = styled(Container)`
	box-shadow: 0px 5px 10px 5px rgb(255 178 199 / 20%);
    border-radius: 12px;
    border: 1px solid rgb(255 178 199 / 40%);
`;

const WelComeHeaderStyle = styled(Row)`
	position: relative;
    margin-bottom: 20px;
	&::after {
		content: " ";
		width: 120px;
		height: 100px;
		background-image: url(/boom.png);
		position: absolute;
		top: -110%;
		right: -17%;
		z-index: 1000;
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
	}
`;

export { WelcomeContainerStyle, WelComeHeaderStyle };
