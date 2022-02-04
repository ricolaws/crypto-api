import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
	const account = useSelector((state) => state.account);
	const [featuredAsset, setFeaturedAsset] = useState("");
	const [coinList, setCoinList] = useState();
	const [displayColors, setDisplayColors] = useState();
	const { width } = useWindowDimensions();
	const [conditionalDisplayContent, setConditionalDisplayContent] =
		useState("chart");

	console.log(account);

	// useEffect(() => {
	//   if (account) {
	//     const currentData = getMarketData(account)

	//   }

	// }, [account])

	// getting the currentData ok,
	// but i need to create an action because the async stuff is getting Weird.

	useEffect(() => {
		setDisplayColors(props.colors);
	}, [props.colors]);

	const clickAssetHandler = (asset) => {
		setFeaturedAsset(userData.userAssets[asset]);
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

	return null;

	return (
		<React.Fragment>
			<div className={classes.container}>
				<div className={classes.overview}>
					{userData ? (
						<ValueAndCost
							title={"Portfolio"}
							value={userData.portfolioValue}
							cost={props.account.portfolioCost}
						/>
					) : null}
				</div>
				<div className={classes.featured}>
					{featuredAsset ? (
						<ValueAndCost
							title={featuredAsset.symbol.toUpperCase()}
							value={featuredAsset.current_value}
							cost={featuredAsset.total_cost}
						/>
					) : (
						`Select a Coin  ${arrow}`
					)}
				</div>
				<div className={classes.conditional}>
					<ConditionalDisplay
						display={conditionalDisplayContent}
						featuredAsset={featuredAsset}
						colors={displayColors}
						colorPatterns={props.colorPatterns}
						data={userData}
						onAddTrade={addTradeHandler}
						coinList={coinList}
						onCloseWindow={toggleAddTradeHandler}
					/>
				</div>
				<div className={classes.button1}>
					<AddTradeButton
						onAddTrade={toggleAddTradeHandler}
						display={conditionalDisplayContent}
					/>
				</div>
				<div className={classes.button2}>
					<ViewTradesButton
						onViewTrades={toggleViewTradesHandler}
						display={conditionalDisplayContent}
					/>
				</div>
				<div className={classes.portfolio_chart}>
					<PortfolioChart
						colorPatterns={props.colorPatterns}
						onSetFeaturedAsset={clickAssetHandler}
						data={userData}
					/>
				</div>
			</div>
			<div className={classes.labelsContainer}>
				<div className={`${classes.rows} ${classes.labels}`}>
					<div className={classes.nameHeading}>Name</div>
					<div className={classes.symbol}>Symbol</div>
					<div>Price</div>
					<div>24hr.</div>
					<div>7d.</div>
					<div>M.Cap</div>
					<div>ROI</div>
				</div>
			</div>
			{userData.userAssets.map((coin) => {
				return (
					<CoinInfo
						key={coin.id}
						name={coin.name}
						price={coin.current_price}
						image={coin.image}
						symbol={coin.symbol}
						marketCap={coin.market_cap}
						priceChange24={coin.price_change_24h}
						priceChange7d={coin.price_change_7d}
						roi={coin.roi}
					/>
				);
			})}
		</React.Fragment>
	);
}

export default Dashboard;
