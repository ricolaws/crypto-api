import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import BrowseCoins from "./pages/BrowseCoins";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import MainHeader from "./components/MainHeader";
import { colorList, colorPatterns } from "./theme/colorPatterns";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccountData, fetchMarketData } from "./store/account-actions";
import { buildCurrentAccount } from "./logic/calcAccountFunctions";

function App() {
	const history = useHistory();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
	const account = useSelector((state) => state.account);
	const marketData = useSelector((state) => state.marketData);

	// move to dashboard on login
	useEffect(() => {
		const routeChange = (path) => {
			history.push(path);
		};
		if (isLoggedIn) {
			routeChange("/dashboard");
		}
	}, [isLoggedIn, history]);

	// get account data from firebase on login
	useEffect(() => {
		if (isLoggedIn) {
			dispatch(fetchAccountData());
			console.log("app fetch");
		}
	}, [isLoggedIn, dispatch]);

	// get market data from CoinGecko
	useEffect(() => {
		if (account) {
			console.log("FMD");
			dispatch(fetchMarketData(account.coinData));
		}
	}, [account, dispatch]);

	// combine market data with stored account data
	const buildHandler = () => {
		console.log("MARKET", marketData);
		console.log("ACCOUNT", account.coinData);
		let result = buildCurrentAccount(marketData, account.coinData);
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
			<button onClick={buildHandler}>BUILD</button>
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
