import React from "react";
import classes from "./Tab.module.css";

function Tab(props) {
	const { active, onClick, label } = props;

	const clickHandler = () => {
		onClick(label);
	};
	return (
		<button
			onClick={clickHandler}
			className={`${classes.tab} ${active ? classes.active : ""}`}
		>
			{label}
		</button>
	);
}

export default Tab;
