import React from "react";
import AddTradeButton from "./AddTradeButton";
import ViewTradesButton from "./ViewTradesButton";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlice";

function ControlDashboard(props) {
	const dispatch = useDispatch();
	const displayContent = useSelector((state) => state.ui.display);

	const toggleAddTradeHandler = () => {
		if (displayContent === "chart" || displayContent === "view") {
			dispatch(uiActions.setDashboardDisplay("add"));
		} else dispatch(uiActions.setDashboardDisplay("chart"));
	};

	const toggleViewTradesHandler = () => {
		if (displayContent === "chart" || displayContent === "add") {
			dispatch(uiActions.setDashboardDisplay("view"));
		} else dispatch(uiActions.setDashboardDisplay("chart"));
	};

	// const addTradeHandler = (trade) => {
	// 	props.onAddTrade(trade);
	// };

	return (
		<div>
			<AddTradeButton onAddTrade={toggleAddTradeHandler} />
			<ViewTradesButton onViewTrades={toggleViewTradesHandler} />
		</div>
	);
}

export default ControlDashboard;
