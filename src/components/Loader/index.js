import styled from "styled-components";
import PropTypes from "prop-types";

import { center } from "../styles/sharecss";
import { memo } from "react";

const LoaderContainerStyle = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	background: #8080804d;
	top: 0;
	left: 0;
	border-radius: 12px;
	.lds-ripple {
		display: inline-block;
		${center}
		width: 80px;
		height: 80px;
	}
	.lds-ripple div {
		position: absolute;
		border: 4px solid #fff;
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	.lds-ripple div:nth-child(2) {
		animation-delay: -0.5s;
	}
	@keyframes lds-ripple {
		0% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 0;
		}
		4.9% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 0;
		}
		5% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: 0px;
			left: 0px;
			width: 72px;
			height: 72px;
			opacity: 0;
		}
	}
`;

const Loader = ({ show }) => {
	return (
		show && (
			<LoaderContainerStyle>
				<div className="lds-ripple">
					<div></div>
					<div></div>
				</div>
			</LoaderContainerStyle>
		)
	);
};

Loader.defaultProps = {
	show: false,
};

Loader.propTypes = {
	show: PropTypes.bool,
};

export default memo(Loader);
