import React from "react";
import PortfolioLineChart from "./PortfolioLineChart";
import AddTradeWindow from "./AddTradeWindow";
import TradeHistoryWindow from "./TradeHistoryWindow";
import classes from "./ConditionalDisplay.module.css";
import { useSelector } from "react-redux";
import Card from "./Card";
import TabGroup from "./TabGroup";

function ConditionalDisplay() {
	const display = useSelector((state) => state.ui.display);
	const labels = ["Chart", "Add Trade", "History"];

	return (
		<Card>
			<div className={classes.container}>
				<TabGroup labels={labels} />
				<div className={classes.content}>
					{display === "Chart" && <PortfolioLineChart />}
					{display === "Add Trade" && <AddTradeWindow />}
					{display === "History" && <TradeHistoryWindow />}
				</div>
			</div>
		</Card>
	);
}

export default ConditionalDisplay;
