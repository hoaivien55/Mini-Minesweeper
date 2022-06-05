import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";

import Popup from "..";

it("Popup: Virtual DOM snapshot", () => {
	const tree = renderer.create(<Popup message={"hello there"} />).toJSON();
	expect(tree).toMatchSnapshot();
});

test("Popup: change message", async () => {
	const message = "hello Adam";
	render(<Popup message={message} />);
	expect(screen.getByText(message)).toBeInTheDocument();
});

test("Popup: accept button click", async () => {
	const message = "hello Adam";
	const acceptClick = jest.fn();
	render(<Popup message={message} accept={acceptClick} />);
	const button = screen.getByText(/Accept/);
	fireEvent.click(button);
	expect(acceptClick).toHaveBeenCalledTimes(1);
});

test("Popup: reject button click", async () => {
	const message = "hello Adam";
	const rejectClick = jest.fn();
	render(<Popup message={message} reject={rejectClick} />);
	const button = screen.getByText(/Reject/);
	fireEvent.click(button);
	expect(rejectClick).toHaveBeenCalledTimes(1);
});

test("Popup: button label", async () => {
	const message = "hello Adam";
	const acceptLabel = "test 1";
	const rejecttLabel = "test 2";
	render(
		<Popup
			message={message}
			acceptLabel={acceptLabel}
			rejectLabel={rejecttLabel}
		/>
	);
	expect(screen.getByText(new RegExp(acceptLabel))).toBeInTheDocument();
	expect(screen.getByText(new RegExp(rejecttLabel))).toBeInTheDocument();
});
