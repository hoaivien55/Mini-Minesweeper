// import { useTheme } from "styled-components";
import styled from "styled-components";
import PropTypes from "prop-types";

import { generateGameMap, SQUARE_TYPES } from "../../../utils";
import Square from "./Square";
import { memo, useState } from "react";

const GameBoxStyle = styled.div`
	display: grid;
	grid-template-columns: repeat(${(props) => props.repeat}, 1fr);
	border: 10px solid #a5a08d;
	user-select: none;
`;

const WIN = true;

const GameBox = ({ size, mines, endGame, startGame }) => {
	// const theme = useTheme();
	const matrix = generateGameMap(mines, size);
	const [_boardStatus, _setBoardStatus] = useState(matrix);
	const [_endGame, _setEndGame] = useState(false);

	const squareClick = (x, y, action) => {
		if (_endGame) {
			return;
		}
		const { status, flag } = _boardStatus[y][x];
		if (action === SQUARE_TYPES.FLAG) {
			_flag(x, y);
		} else if (_isOpenSquare(action, status, flag)) {
			startGame(true);
			_openSquare(x, y);
		}
	};

	const _flag = (x, y) => {
		_boardStatus[y][x].flag = !_boardStatus[y][x].flag;
		_setBoardStatus([..._boardStatus]);
	};

	const _openSquare = (x, y) => {
		const { type } = _boardStatus[y][x];
		// console.log("open");
		if (type === SQUARE_TYPES.BOOM) {
			_showAllMines();
			_setEndGame(true);
			endGame(!WIN);
		} else if (type === SQUARE_TYPES.EMPTY || type === SQUARE_TYPES.NUM) {
			const cacheTravel = {};
			_splashingSquare(cacheTravel, x, y);
			_setBoardStatus([..._boardStatus]);
			if (_isWinGame()) {
				_setEndGame(true);
				endGame(WIN);
			}
		}
	};

	const _showAllMines = () => {
		for (let mine of mines) {
			const { x, y } = mine;
			if (_boardStatus[y][x].flag === false) {
				_boardStatus[y][x].status = SQUARE_TYPES.OPEN;
			}
		}
		_setBoardStatus([..._boardStatus]);
	};

	const _splashingSquare = (cacheTravel, x, y) => {
		// // console.log(x,y)
		if (cacheTravel[`${x}+${y}`] || x < 0 || y < 0 || x >= size || y >= size) {
			return;
		}
		cacheTravel[`${x}+${y}`] = true;
		const { type, status, flag } = _boardStatus[y][x];
		if (
			status === SQUARE_TYPES.CLOSE &&
			type !== SQUARE_TYPES.BOOM &&
			flag === false
		) {
			_boardStatus[y][x].status = SQUARE_TYPES.OPEN;
			if (type === SQUARE_TYPES.NUM) {
				return;
			}
		} else {
			return;
		}

		_splashingSquare(cacheTravel, x - 1, y - 1);
		_splashingSquare(cacheTravel, x, y - 1);
		_splashingSquare(cacheTravel, x + 1, y - 1);

		_splashingSquare(cacheTravel, x - 1, y);
		_splashingSquare(cacheTravel, x + 1, y);

		_splashingSquare(cacheTravel, x - 1, y + 1);
		_splashingSquare(cacheTravel, x, y + 1);
		_splashingSquare(cacheTravel, x + 1, y + 1);
	};

	const _isWinGame = () => {
		let numberOfCloseSquare = 0;
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				if (
					_boardStatus[y][x].status === SQUARE_TYPES.CLOSE &&
					_boardStatus[y][x].type === SQUARE_TYPES.BOOM
				) {
					numberOfCloseSquare++;
				} else if (_boardStatus[y][x].status === SQUARE_TYPES.CLOSE) {
					return false;
				}
			}
		}
		if (numberOfCloseSquare === mines.length) {
			return true;
		}
		return false;
	};

	const _isOpenSquare = (action, status, flag) => {
		return (
			action === SQUARE_TYPES.OPEN &&
			status === SQUARE_TYPES.CLOSE &&
			flag === false
		);
	};

	return (
		<GameBoxStyle repeat={size}>
			{_boardStatus.map((row, y) =>
				row.map((square, x) => (
					<Square
						key={y + x}
						x={x}
						y={y}
						status={square.status}
						type={square.type}
						num={square.num}
						onClick={squareClick}
						flag={square.flag}
					/>
				))
			)}
		</GameBoxStyle>
	);
};

GameBox.propTypes = {
	size: PropTypes.number.isRequired,
	mines: PropTypes.array.isRequired,
	endGame: PropTypes.func.isRequired,
	startGame: PropTypes.func.isRequired,
};

export default memo(GameBox);
