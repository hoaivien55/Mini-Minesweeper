import { Fragment, memo, useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { fetchMines } from "../../api";
import { FETCH_DATA } from "../../store/actions";
import Popup from "../../components/Popup";
import { Container, Row, Error } from "../../components/styles";
import { Store } from "../../store";
import GameBox from "./components/GameBox";
import Header from "./components/Header";
import Loader from "../../components/Loader";
import { getLevelSelectedObj } from "../../utils";

const Game = () => {
	const navigate = useNavigate();
	const { appState, dispatch } = useContext(Store);
	const [_gameStatus, _setGameStatus] = useState({
		end: false,
		begin: false,
		count: 1,
		timer: false,
		gameTime: "",
	});
	const [_loader, _setLoader] = useState(false);
	const [_error, _setError] = useState("");

	const { rawMines, levels, levelSelected } = appState;
	const level = getLevelSelectedObj(levels, levelSelected);
	const { size } = level;
	const timerRef = useRef();

	useEffect(() => {
		async function _fetchMines() {
			if (rawMines.length === 0) {
				// default mines
				// console.log("reload mines")
				_setError("");
				_setLoader(true);
				const { mines, size } = level;
				const data = await fetchMines({ mines, size });
				if (data && data.length > 0) {
					dispatch({
						type: FETCH_DATA,
						payload: data,
					});
				} else {
					_setError("Cannot call api. Please try again.");
				}
				_setLoader(false);
			}
		}
		_fetchMines();

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		// console.log("change raw mines")
		_setGameStatus({
			count: _gameStatus.count + 1,
			end: false,
			timer: false,
		});
		// eslint-disable-next-line
	}, [rawMines]);

	const _startGame = () => {
		_setGameStatus({
			..._gameStatus,
			timer: true,
			gameTime: "",
		});
	};

	const _endGame = (win) => {
		// console.log("endgame", win);
		const gameTime = timerRef.current.getTime();
		_setGameStatus({
			..._gameStatus,
			timer: false,
			end: true,
			win,
			gameTime,
		});
	};

	const _getLevelName = () => {
		const level = getLevelSelectedObj(levels, levelSelected);
		// console.log("level", level);
		return (level && level.name) || "";
	};

	const _popupMessage = () => {
		return `You ${(_gameStatus.win && "won") || "lost"} the game in ${
			_gameStatus.gameTime || "00:00:00"
		}`;
	};

	const _goHomepage = () => {
		navigate("/");
	};

	const _newGame = async () => {
		// console.log("restart game");
		_setError("");
		const { mines, size } = level;
		const data = await fetchMines({ mines, size });
		if (data && data.length > 0) {
			dispatch({
				type: FETCH_DATA,
				payload: data,
			});
		} else {
			_setError("Cannot call api. Please try again.");
		}
		_setGameStatus({
			count: _gameStatus.count + 1,
			end: false,
			timer: false,
			gameTime: "",
		});
		_setLoader(false);
	};

	const _popup = (message) => {
		return (
			_gameStatus.end && (
				<Popup
					message={message || _popupMessage()}
					acceptLabel={"new game"}
					rejectLabel={"home page"}
					reject={_goHomepage}
					accept={_newGame}
				/>
			)
		);
	};

	return (
		<Fragment>
			{_popup()}
			<Container backgroundColor="#ffffff" key={_gameStatus.count}>
				<Loader show={_loader} />
				<Header
					timer={_gameStatus.timer}
					level={_getLevelName()}
					timerRef={timerRef}
				/>
				<GameBox
					size={size}
					mines={rawMines}
					endGame={_endGame}
					startGame={_startGame}
				/>
				<Row>
					<Error>{_error}</Error>
				</Row>
			</Container>
		</Fragment>
	);
};

export default memo(Game);
