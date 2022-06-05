import { memo } from "react";
import PropTypes from "prop-types";


import { SQUARE_TYPES } from "../../../utils";
import SquareStyle from './SquareStyle';

const colors = {
	1: "blue",
	2: "green",
	3: "red",
	4: "pink",
	5: "yellow",
};

const Square = ({ x, y, status, onClick, num, flag, type }) => {
	const _onContextMenu = (event) => {
		event.preventDefault();
		if (status === SQUARE_TYPES.CLOSE) {
			// console.log("flag");
            onClick(x,y, SQUARE_TYPES.FLAG);
		}
	};
	const _showValue = () => {
		if (status === SQUARE_TYPES.OPEN) {
			return num || "";
		}
		return "";
	};

    const _getClassName = () => {
        return flag ? "flag" : status === SQUARE_TYPES.CLOSE ? SQUARE_TYPES.CLOSE : type;
    }

	return (
		<SquareStyle
			className={_getClassName()}
			onClick={() => onClick(x, y, SQUARE_TYPES.OPEN)}
			color={(_showValue() && colors[num]) || ""}
			onContextMenu={_onContextMenu}
		>
			{_showValue()}
		</SquareStyle>
	);
};

Square.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	status: PropTypes.oneOf(Object.values(SQUARE_TYPES)).isRequired,
	type: PropTypes.oneOf(Object.values(SQUARE_TYPES)).isRequired,
	onClick: PropTypes.func.isRequired,
	num: PropTypes.number,
    flag: PropTypes.bool.isRequired
};

export default memo(Square);
