import React from "react";
import PortfolioLineChart from "./PortfolioLineChart";
import AddTradeWindow from "./AddTradeWindow";
import TradeHistoryWindow from "./TradeHistoryWindow";
import { useSelector } from "react-redux";
import Card from "./Card";

// display={displayContent}
// 							featuredCoin={featuredCoin}
// 							colors={displayColors}
// 							colorPatterns={props.colorPatterns}
// 							data={account.coinData}

function ConditionalDisplay(props) {
	const display = useSelector((state) => state.ui.display);

	return (
		<Card>
			{display === "chart" && <PortfolioLineChart />}
			{display === "add" && <AddTradeWindow />}
			{display === "view" && <TradeHistoryWindow />}
		</Card>
	);

	// let content = null;
	// if (props.display === "chart") {
	// 	content = (
	// 		<PortfolioLineChart
	// 			colorPatterns={props.colorPatterns}
	// 			featuredCoin={props.featuredCoin}
	// 			colors={props.colors}
	// 			coins={props.coinList}
	// 			amounts={props.data.userAssets}
	// 			data={props.data}
	// 		/>
	// 	);
	// }
	// if (props.display === "add") {
	// 	content = (
	// 		<AddTradeWindow
	// 			onAddTrade={props.onAddTrade}
	// 			coinList={props.coinList}
	// 			onCloseWindow={props.onCloseWindow}
	// 		/>
	// 	);
	// }
	// if (props.display === "view") {
	// 	content = <TradeHistoryWindow data={props.data} />;
	// }

	// return <Card>{content}</Card>;
}

export default ConditionalDisplay;
