import React from "react";
import PortfolioLineChart from "./PortfolioLineChart";
import AddTradeWindow from "./AddTradeWindow";
import TradeHistoryWindow from "./TradeHistoryWindow";
import { useSelector } from "react-redux";
import Card from "./Card";

function ConditionalDisplay() {
	const display = useSelector((state) => state.ui.display);

	return (
		<Card>
			{display === "chart" && <PortfolioLineChart />}
			{display === "add" && <AddTradeWindow />}
			{display === "view" && <TradeHistoryWindow />}
		</Card>
	);
}

export default ConditionalDisplay;
