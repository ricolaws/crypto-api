import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import BrowseCoins from "./pages/BrowseCoins";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import MainHeader from "./components/MainHeader";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchAccountData,
	fetchMarketData,
	buildCurrentAccount,
	fetchDailyMarketData,
} from "./store/account-actions";

function App() {
	const history = useHistory();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
	const account = useSelector((state) => state.account);
	const marketData = useSelector((state) => state.marketData.data);
	const needMarketData = useSelector((state) => state.sequence.needMarketData);
	const needDailyData = useSelector((state) => state.sequence.needDailyData);
	const dataIsReady = useSelector((state) => state.sequence.dataIsReady);

	// move to dashboard on login
	useEffect(() => {
		const routeChange = (path) => {
			history.push(path);
		};
		if (isLoggedIn) {
			routeChange("/dashboard");
		}
	}, [isLoggedIn, history]);

	// get account data from firebase on login. set needMarketData = true
	useEffect(() => {
		if (isLoggedIn) {
			dispatch(fetchAccountData());
		}
	}, [isLoggedIn, dispatch]);

	// get market data from CoinGecko. set needMarketData = false & needDailyData = true
	useEffect(() => {
		if (needMarketData) {
			dispatch(fetchMarketData(account.coinData));
		}
	}, [account, needMarketData, dispatch]);

	// get daily data from CoinGecko. set needDailyData = false & dataIsReady = true
	useEffect(() => {
		if (needDailyData) {
			dispatch(fetchDailyMarketData(account.coinData));
		}
	}, [account, needDailyData, dispatch]);

	// combine account data with coingecko data
	useEffect(() => {
		if (dataIsReady) {
			dispatch(buildCurrentAccount(marketData, account));
		}
	}, [dataIsReady, marketData, dispatch]);

	const addTradeHandler = (trade) => {
		let newcoinData = account.coinData;

		const parts = trade.date.split("-");
		const d = new Date(+parts[0], parts[1] - 1, +parts[2], 12);

		const newMovement = {
			date: d,
			amount: Number(trade.amount),
			price: Number(trade.price),
		};

		const matchedIndex = account.coinData.findIndex(
			(asset) => asset.id === trade.id
		);

		newcoinData[matchedIndex].movements.push(newMovement);

		// setAccount({
		//   ...account,
		//   coinData: newcoinData,
		// });
	};

	return (
		<div className="app">
			<MainHeader />
			<Route path="/welcome">
				<Welcome />
			</Route>
			<Route path="/dashboard">
				{isLoggedIn && <Dashboard onAddTrade={addTradeHandler} />}
			</Route>
			<Route path="/browse">
				<BrowseCoins />
			</Route>
		</div>
	);
}

export default App;
