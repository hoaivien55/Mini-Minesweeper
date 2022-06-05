import { useEffect, useState, useImperativeHandle, forwardRef } from "react";

import { Column } from "../../../components/styles";

const Timer = ({ begin }, ref) => {
	const [_seconds, _setSecond] = useState(0);
	const [_interval, _setInterval] = useState(null);

	// console.log("timer", begin);

	useEffect(() => {
		if (begin) {
			setTimeout(() => {
				_setSecond(1);
			}, 1000);
		}
	}, [begin]);

	useEffect(() => {
		if (begin) {
			const interval = setInterval(() => {
				if (begin === true) {
					// console.log("changed time", _interval);
					_setSecond(_seconds + 1);
				} else {
					// console.log("changed time 2", _interval);
					clearInterval(interval);
				}
			}, 1000);
			_setInterval(interval);
			// console.log("add interval ", _interval);
			return () => {
				// console.log("clear ", _interval);
				clearInterval(interval);
			};
		}
	
	// eslint-disable-next-line
	}, [_seconds]);

	useImperativeHandle(ref, () => ({
		getTime() {
			clearInterval(_interval);
			return _generateLabel();
		},
	}));

	const _generateLabel = () => {
		const oneHour = 3600;
		const oneMinute = 60;
		let hour = 0;
		let minutes = 0;
		let seconds = 0;
		let totalSecond = _seconds;

		if (totalSecond >= oneHour) {
			hour = Math.floor(totalSecond / oneHour);
			totalSecond = totalSecond - hour * oneHour;
		}
		if (totalSecond >= oneMinute) {
			minutes = Math.floor(totalSecond / oneMinute);
			totalSecond = totalSecond - minutes * oneMinute;
		}
		seconds = totalSecond;
		return `${`0${hour}`.slice(-2)}:${`0${minutes}`.slice(
			-2
		)}:${`0${seconds}`.slice(-2)}`;
	};

	return <Column>{_generateLabel()}</Column>;
};


export default forwardRef(Timer);
