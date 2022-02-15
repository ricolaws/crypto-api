import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlice";
import PortfolioChart from "../components/PortfolioChart";
import ValueAndCost from "../components/ValueAndCost";
import CoinInfo from "../components/CoinInfo";
import AddTradeButton from "../components/AddTradeButton";
import ViewTradesButton from "../components/ViewTradesButton";
import ConditionalDisplay from "../components/ConditionalDisplay";
import classes from "./Dashboard.module.css";

function Dashboard(props) {
	const account = useSelector((state) => state.account);
	const showDash = useSelector((state) => state.ui.showDash);
	const featuredCoin = useSelector((state) => state.ui.featured);
	const displayContent = useSelector((state) => state.ui.display);
	const dispatch = useDispatch();
	const [conditionalDisplayContent, setConditionalDisplayContent] =
		useState("chart");

	const clickAssetHandler = (coin) => {
		console.log(coin, account.coinData[coin]);
		dispatch(uiActions.setFeatured(account.coinData[coin]));
	};

	const toggleAddTradeHandler = () => {
		if (
			conditionalDisplayContent === "chart" ||
			conditionalDisplayContent === "view"
		) {
			setConditionalDisplayContent("add");
		} else setConditionalDisplayContent("chart");
	};

	const toggleViewTradesHandler = () => {
		if (
			conditionalDisplayContent === "chart" ||
			conditionalDisplayContent === "add"
		) {
			setConditionalDisplayContent("view");
		} else setConditionalDisplayContent("chart");
	};

	const addTradeHandler = (trade) => {
		props.onAddTrade(trade);
	};

	return (
		<React.Fragment>
			{showDash && (
				<div className={classes.container}>
					<div className={classes.overview}>
						<ValueAndCost
							title={"Portfolio"}
							value={account.portfolioValue}
							cost={account.portfolioCost}
							roi={account.portfolioROI}
						/>
					</div>
					<div className={classes.featured}>
						{!featuredCoin.none ? (
							<ValueAndCost
								title={featuredCoin.symbol.toUpperCase()}
								value={featuredCoin.currentValue}
								cost={featuredCoin.totalCost}
								roi={featuredCoin.roi}
							/>
						) : (
							`Select a Coin for details.`
						)}
					</div>
					<div className={classes.conditional}>
						<ConditionalDisplay
							onAddTrade={addTradeHandler}
							onCloseWindow={toggleAddTradeHandler}
						/>
					</div>
					<div className={classes.button1}>
						<AddTradeButton
							onAddTrade={toggleAddTradeHandler}
							display={displayContent}
						/>
					</div>
					<div className={classes.button2}>
						<ViewTradesButton
							onViewTrades={toggleViewTradesHandler}
							display={displayContent}
						/>
					</div>
					<div className={classes.portfolio_chart}>
						<PortfolioChart
							onSetFeaturedCoin={clickAssetHandler}
							data={account.coinData}
						/>
					</div>
				</div>
			)}
			<div className={classes.labelsContainer}>
				<div className={`${classes.rows} ${classes.labels}`}>
					<div className={classes.nameHeading}></div>
					<div className={classes.symbol}>Symbol</div>
					<div>Price</div>
					<div>24hr.</div>
					<div>7d.</div>
					<div>M.Cap</div>
					<div>ROI</div>
				</div>
			</div>
			{showDash &&
				account.coinData.map((coin) => {
					return (
						<CoinInfo
							key={coin.id}
							name={coin.name}
							price={coin.currentPrice}
							image={coin.image}
							symbol={coin.symbol}
							marketCap={coin.marketCap}
							priceChange24={coin.priceChange_24h}
							priceChange7d={coin.priceChange_7d}
							roi={coin.roi}
						/>
					);
				})}
		</React.Fragment>
	);

	// return (
	// 	<React.Fragment>
	// 		<div className={classes.container}>
	// 			<div className={classes.overview}>
	// 				{userData ? (
	// 					<ValueAndCost
	// 						title={"Portfolio"}
	// 						value={userData.portfolioValue}
	// 						cost={props.account.portfolioCost}
	// 					/>
	// 				) : null}
	// 			</div>
	// 			<div className={classes.featured}>
	// 				{featuredAsset ? (
	// 					<ValueAndCost
	// 						title={featuredAsset.symbol.toUpperCase()}
	// 						value={featuredAsset.current_value}
	// 						cost={featuredAsset.total_cost}
	// 					/>
	// 				) : (
	// 					`Select a Coin  ${arrow}`
	// 				)}
	// 			</div>
	// 			<div className={classes.conditional}>
	// 				<ConditionalDisplay
	// 					display={conditionalDisplayContent}
	// 					featuredAsset={featuredAsset}
	// 					colors={displayColors}
	// 					colorPatterns={props.colorPatterns}
	// 					data={userData}
	// 					onAddTrade={addTradeHandler}
	// 					coinList={coinList}
	// 					onCloseWindow={toggleAddTradeHandler}
	// 				/>
	// 			</div>
	// 			<div className={classes.button1}>
	// 				<AddTradeButton
	// 					onAddTrade={toggleAddTradeHandler}
	// 					display={conditionalDisplayContent}
	// 				/>
	// 			</div>
	// 			<div className={classes.button2}>
	// 				<ViewTradesButton
	// 					onViewTrades={toggleViewTradesHandler}
	// 					display={conditionalDisplayContent}
	// 				/>
	// 			</div>
	// 			<div className={classes.portfolio_chart}>
	// 				<PortfolioChart
	// 					colorPatterns={props.colorPatterns}
	// 					onSetFeaturedAsset={clickAssetHandler}
	// 					data={userData}
	// 				/>
	// 			</div>
	// 		</div>
	// 		<div className={classes.labelsContainer}>
	// 			<div className={`${classes.rows} ${classes.labels}`}>
	// 				<div className={classes.nameHeading}>Name</div>
	// 				<div className={classes.symbol}>Symbol</div>
	// 				<div>Price</div>
	// 				<div>24hr.</div>
	// 				<div>7d.</div>
	// 				<div>M.Cap</div>
	// 				<div>ROI</div>
	// 			</div>
	// 		</div>
	// 		{userData.userAssets.map((coin) => {
	// 			return (
	// 				<CoinInfo
	// 					key={coin.id}
	// 					name={coin.name}
	// 					price={coin.current_price}
	// 					image={coin.image}
	// 					symbol={coin.symbol}
	// 					marketCap={coin.market_cap}
	// 					priceChange24={coin.price_change_24h}
	// 					priceChange7d={coin.price_change_7d}
	// 					roi={coin.roi}
	// 				/>
	// 			);
	// 		})}
	// 	</React.Fragment>
	// );
}

export default Dashboard;
