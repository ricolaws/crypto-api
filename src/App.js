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
	sendAccountData,
} from "./store/account-actions";

function App() {
	const history = useHistory();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
	const account = useSelector((state) => state.account);
	const marketData = useSelector((state) => state.marketData.data);
	// const needMarketData = useSelector((state) => state.sequence.needMarketData);
	// const needDailyData = useSelector((state) => state.sequence.needDailyData);
	// const buildAccount = useSelector((state) => state.sequence.buildAccount);
	const { needMarketData, needDailyData, buildAccount, sendAccount } =
		useSelector((state) => state.sequence);

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

	// get daily data from CoinGecko. set needDailyData = false & buildAccount = true
	useEffect(() => {
		if (needDailyData) {
			dispatch(fetchDailyMarketData(account.coinData));
		}
	}, [account, needDailyData, dispatch]);

	// combine account data with coingecko data
	useEffect(() => {
		if (buildAccount) {
			dispatch(buildCurrentAccount(marketData, account));
		}
	}, [buildAccount, marketData, dispatch]);

	// * * * update Firebase with current account * * *
	useEffect(() => {
		if (sendAccount) {
			dispatch(sendAccountData(account));
		}
	}, [sendAccount, account, dispatch]);

	return (
		<div className="app">
			<MainHeader />
			<Route path="/welcome">
				<Welcome />
			</Route>
			<Route path="/dashboard">{isLoggedIn && <Dashboard />}</Route>
			<Route path="/browse">
				<BrowseCoins />
			</Route>
		</div>
	);
}

export default App;
