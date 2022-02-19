import React from "react";
import Trade from "./Trade";
import { useSelector } from "react-redux";
import classes from "./TradeHistoryWindow.module.css";

function TradeHistoryWindow(props) {
	const coinData = useSelector((state) => state.account.coinData);
	const content = coinData.map((coin) => {
		console.log(new Date(coin.movements[0].date));
		return {
			asset: coin.name,
			trades: coin.movements.map(
				(mov) =>
					`${new Date(mov.date).toDateString()}:  ${mov.amount} at $${
						mov.price
					}`
			),
		};
	});

	return (
		<div className={classes.container}>
			<div className={classes.banner}>
				<h2>Trade History</h2>
			</div>
			<div className={classes.main}>
				{content.map((mov, i) => {
					return <Trade data={mov} key={i} />;
				})}
			</div>
		</div>
	);
}

export default TradeHistoryWindow;
