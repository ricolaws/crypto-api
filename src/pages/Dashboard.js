import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlice";
import PortfolioChart from "../components/PortfolioChart";
import ValueAndCost from "../components/ValueAndCost";
import CoinInfo from "../components/CoinInfo";
import AddTradeButton from "../components/AddTradeButton";
import ViewTradesButton from "../components/ViewTradesButton";
import ConditionalDisplay from "../components/ConditionalDisplay";
import useWindowDimensions from "../hooks/getWindowDimensions";
import classes from "./Dashboard.module.css";

function Dashboard(props) {
	const [userData, setUserData] = useState({ userAssets: [] });
	const account = useSelector((state) => state.account.data);
	const showDash = useSelector((state) => state.ui.showDash);
	const featuredCoin = useSelector((state) => state.ui.featured);
	const displayContent = useSelector((state) => state.ui.display);
	const dispatch = useDispatch();

	// const [featuredAsset, setFeaturedAsset] = useState("");
	const [coinList, setCoinList] = useState();
	const [displayColors, setDisplayColors] = useState();
	const { width } = useWindowDimensions();
	const [conditionalDisplayContent, setConditionalDisplayContent] =
		useState("chart");

	useEffect(() => {
		setDisplayColors(props.colors);
	}, [props.colors]);

	const clickAssetHandler = (asset) => {
		dispatch(uiActions.setFeatured(account.coinData[asset]));
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

	let arrow = "→";
	if (width < 920) {
		arrow = "↓";
	} else arrow = "→";

	return (
		<React.Fragment>
			{showDash && (
				<div className={classes.container}>
					<div className={classes.overview}>
						<ValueAndCost
							title={"Portfolio"}
							value={account.portfolioValue}
							cost={account.portfolioCost}
						/>
					</div>
					<div className={classes.featured}>
						{featuredCoin ? (
							<ValueAndCost
								title={featuredCoin.symbol.toUpperCase()}
								value={featuredCoin.current_value}
								cost={featuredCoin.total_cost}
							/>
						) : (
							`Select a Coin  ${arrow}`
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
							colorPatterns={props.colorPatterns}
							onSetFeaturedAsset={clickAssetHandler}
							data={account.coinData}
						/>
					</div>
				</div>
			)}
			<button onClick={clickAssetHandler}>feat</button>
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
