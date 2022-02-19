import React from "react";
import Tab from "./Tab";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlice";
import classes from "./TabGroup.module.css";

function TabGroup(props) {
	const dispatch = useDispatch();
	const selectedTab = useSelector((state) => state.ui.display);

	const tabSelectHandler = (tab) => {
		dispatch(uiActions.setDashboardDisplay(tab));
	};
	return (
		<div className={classes.group}>
			{props.labels.map((label) => (
				<Tab
					key={label}
					active={selectedTab === label}
					onClick={tabSelectHandler}
					label={label}
				/>
			))}
		</div>
	);
}

export default TabGroup;
