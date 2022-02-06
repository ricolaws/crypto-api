import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import BrowseCoins from "./pages/BrowseCoins";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import MainHeader from "./components/MainHeader";
import { colorList, colorPatterns } from "./theme/colorPatterns";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchAccountData,
	fetchMarketData,
	fetchDailyData,
	buildCurrentAccount,
} from "./store/account-actions";
import { accountActions } from "./store/accountSlice";

function App() {
	const history = useHistory();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
	const account = useSelector((state) => state.account.data);
	const accountReady = useSelector((state) => state.account.ready);
	const marketData = useSelector((state) => state.marketData.data);
	const needMarketData = useSelector((state) => state.marketData.needData);

	// move to dashboard on login
	useEffect(() => {
		const routeChange = (path) => {
			history.push(path);
		};
		if (isLoggedIn) {
			routeChange("/dashboard");
		}
	}, [isLoggedIn, history]);

	// get account data from firebase on login. needMarketData = true
	useEffect(() => {
		if (isLoggedIn) {
			console.log("effect #2", needMarketData);
			dispatch(fetchAccountData());
		}
	}, [isLoggedIn, dispatch]);

	// get market data from CoinGecko. needMarketData = false
	useEffect(() => {
		if (account && needMarketData) {
			console.log("effect #3", needMarketData, account);
			dispatch(fetchMarketData(account.coinData));
		}
	}, [account, needMarketData, dispatch]);

	useEffect(() => {
		if (accountReady) {
			console.log("USEEFFECT#4");
			dispatch(buildCurrentAccount(marketData, account));
		}
	}, [accountReady, dispatch]);

	const dailyHandler = () => {
		console.log("DAILY");
		fetchDailyData(account.coinData);
	};

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
			<button onClick={dailyHandler}>daily</button>
			<Route path="/dashboard">
				{isLoggedIn && (
					<Dashboard
						colors={colorList}
						colorPatterns={colorPatterns}
						onAddTrade={addTradeHandler}
					/>
				)}
			</Route>
			<Route path="/browse">
				<BrowseCoins />
			</Route>
		</div>
	);
}

export default App;

/* <Route path="/dashboard">
{account && <Dashboard
  account={account}
  colors={colorList}
  colorPatterns={colorPatterns}
  onAddTrade={addTradeHandler}
/>}

</Route> */
