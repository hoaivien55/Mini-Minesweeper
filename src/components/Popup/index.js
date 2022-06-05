import PropTypes from "prop-types";
import { memo } from "react";

import { Button, Row } from "../styles";
import {
	PopupStyle,
	PopupContainerStyle,
	PopupBodyStyle,
	PopupFooter,
} from "./PopupStyle";

const Popup = ({ accept, reject, acceptLabel, rejectLabel, message }) => {
	return (
		<PopupStyle>
			<PopupContainerStyle>
				<PopupBodyStyle>
					<Row className="paragraph">{message}</Row>
				</PopupBodyStyle>
				<PopupFooter>
					<Button onClick={accept}>{acceptLabel}</Button>
					<Button onClick={reject}>{rejectLabel}</Button>
				</PopupFooter>
			</PopupContainerStyle>
		</PopupStyle>
	);
};

Popup.defaultProps = {
	accept: () => {},
	reject: () => {},
	acceptLabel: "Accept",
	rejectLabel: "Reject",
};

Popup.propTypes = {
	accept: PropTypes.func,
	reject: PropTypes.func,
	acceptLabel: PropTypes.string,
	rejectLabel: PropTypes.string,
	message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default memo(Popup);
