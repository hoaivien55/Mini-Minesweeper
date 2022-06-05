import styled from 'styled-components';


const SquareStyle = styled.div`
	border: 3px solid;
	border-color: #f7e8ae #bab7a9 #bab7a9 #dbd5b9;
	min-width: 30px;
	height: 30px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	font-size: 17px;
	&.flag {
		&::before {
			content: "🚩";
			position: absolute;
			width: 100%;
			height: 100%;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -30%);
		}
	}
	&.boom {
		background-color: #cecab7;
		border-color: #9c998d;
		&::before {
			content: "💣";
			position: absolute;
			width: 100%;
			height: 100%;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -30%);
		}
	}
	&.empty,
	&.num {
		background-color: #cecab7;
		border-color: #9c998d;
		color: ${(props) => props.color || "black"};
	}
`;

export default SquareStyle;