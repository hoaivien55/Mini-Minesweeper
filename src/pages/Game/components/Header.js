import PropTypes from "prop-types";
import styled from 'styled-components';

import { Column, Row } from "../../../components/styles";
import Timer from "./Timer";

const HeaderStyle = styled(Row)`
	font-size: 1.1em;
	> div:not(:first-child) {
		border-left: 1px solid #80808091;
	}
`;

const Header = ({ timer, level, timerRef }) => {
	return (
		<HeaderStyle>
			{/* <Column>{userName || ""}</Column> */}
			<Column>Level: {level}</Column>
			<Timer begin={timer} ref={timerRef}  />
			<Column title="Right-click an close square to flag it and no limit flag">
			❓
			</Column>
		</HeaderStyle>
	);
};

Header.propTypes = {
	timer: PropTypes.bool.isRequired,
	level: PropTypes.string.isRequired
};

export default Header;
