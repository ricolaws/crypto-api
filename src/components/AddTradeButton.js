import React from "react";
import { useSelector } from "react-redux";

function AddTrade(props) {
	const { onAddTrade } = props;
	const displayContent = useSelector((state) => state.ui.display);

	const clickHandler = () => {
		onAddTrade();
	};

	let label = null;
	if (displayContent === "add") {
		label = "View Chart";
	} else {
		label = "Add Trade";
	}

	return (
		<div>
			<button onClick={clickHandler}>{label}</button>
		</div>
	);
}

export default AddTrade;
