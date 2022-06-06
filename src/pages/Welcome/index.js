import { useContext, memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchMines } from "../../api";
import Loader from "../../components/Loader";
import {
	Row,
	H4,
	Label,
	Input,
	Select,
	Option,
	Column,
	Form,
	Error,
} from "../../components/styles";
import { Store } from "../../store";
import { CHANGE_GAME_LEVEL, FETCH_DATA } from "../../store/actions";

import { WelcomeContainerStyle, WelComeHeaderStyle } from "./WelcomeStyle";

const FORM_FIELDS = {
	USER_NAME: "userName",
	LEVEL: "levelSelected",
};

const Welcome = () => {
	const { appState, dispatch } = useContext(Store);
	const { userName, levelSelected, levels } = appState;
	const [formState, setFormState] = useState({ userName, levelSelected });
	const [_loader, _setLoader] = useState(false);
	const [_error, _setError] = useState("");

	let navigate = useNavigate();

	useEffect(() => {
		if (isChangeForm()) {
			setFormState({
				levelSelected,
				userName,
			});
		}
		// eslint-disable-next-line
	}, [levelSelected, userName]);

	const isChangeForm = () => {
		return (
			formState.userName !== userName ||
			formState.levelSelected !== levelSelected
		);
	};

	const changeFormValue = (name, event) => {
		let { value } = event.target;
		if (FORM_FIELDS.USER_NAME === name && value.length > 10) {
			value = value.substr(0, 10);
		}
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const onSubmit = async (event) => {
		// console.log("submit form");
		_setLoader(true);
		_setError("")
		event.preventDefault();
		dispatch({
			type: CHANGE_GAME_LEVEL,
			payload: formState,
		});
		const { levels } = appState;
		const level = levels.find(
			(level) => level.id === parseInt(formState.levelSelected)
		);
		if (level) {
			const { mines, size } = level;
			const data = await fetchMines({ mines, size });
			if (data && data.length > 0) {
				dispatch({
					type: FETCH_DATA,
					payload: data,
				});
				navigate("/game");
			} else {
				_setError("Cannot call api. Please try again.");
				_setLoader(false);
			}
		}
	};

	return (
		<WelcomeContainerStyle>
			<Loader show={_loader} />
			<WelComeHeaderStyle>
				<H4>Mini Minesweeper</H4>
			</WelComeHeaderStyle>
			<Form onSubmit={onSubmit}>
				<Row>
					<Column flexGrow={1} justifyContent="start">
						<Label>Level:</Label>
					</Column>
					<Column flexGrow={4}>
						<Select
							value={formState.levelSelected || 1}
							onChange={(event) => changeFormValue(FORM_FIELDS.LEVEL, event)}
						>
							{levels.map((level) => (
								<Option key={level.id} value={level.id}>
									{level.name}
								</Option>
							))}
						</Select>
					</Column>
				</Row>
				<Row>
					<Error>{_error}</Error>
				</Row>
				<Row>
					<Input type={"submit"} value={"Start"} />
				</Row>
			</Form>
		</WelcomeContainerStyle>
	);
};

export default memo(Welcome);
