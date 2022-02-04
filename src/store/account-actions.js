import { accountActions } from "./accountSlice";
import { marketDataActions } from "./marketDataSlice";
import {
	calcCoinTotals,
	calcAverageCosts,
} from "../logic/calcAccountFunctions";

// ⎈ ⏣ ⎈ ⏣ ⎈ ⏣ - - FIREBASE - - ⏣ ⎈ ⏣ ⎈ ⏣ ⎈

// fetchAccountData - fetch account from firebase, replace account in redux store with it.
export const fetchAccountData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				"https://crypto-dashboard-7dcab-default-rtdb.firebaseio.com/accounts.json"
			);
			if (!response.ok) {
				throw new Error("Could not fetch account data.");
			}

			const data = await response.json();
			return data;
		};
		try {
			const accountData = await fetchData();
			calcCoinTotals(accountData.coinData);
			calcAverageCosts(accountData.coinData);
			dispatch(
				accountActions.replaceAccount({
					id: accountData.id,
					userName: accountData.userName,
					portfolioValue: accountData.portfolioValue,
					portfolioCost: accountData.portfolioCost,
					coinData: accountData.coinData || [],
				})
			);
		} catch (error) {
			console.log(error);
		}
	};
};

// sendAccountData - replace account in firebase with the one in redux
// maybe be selective about what current coin data is stored?
export const sendAccountData = (account) => {
	return async (dispatch) => {
		const sendRequest = async () => {
			const response = await fetch(
				"https://crypto-dashboard-7dcab-default-rtdb.firebaseio.com/accounts.json",
				{
					method: "PUT",
					body: JSON.stringify({
						id: account.id,
						userName: account.userName,
						coinData: account.coinData,
						portfolioValue: account.portfolioValue,
						portfolioCost: account.portfolioCost,
					}),
				}
			);
			if (!response.ok) {
				throw new Error("Account update failure.");
			}
		};
		try {
			await sendRequest();
		} catch (error) {
			console.log(error);
		}
	};
};

// ⎈ ⏣ ⎈ ⏣ ⎈ ⏣ - - COINGECKO - - ⏣ ⎈ ⏣ ⎈ ⏣ ⎈

// fetch CURRENT Market Data from coingecko API
export const fetchMarketData = (coinData) => {
	return async (dispatch) => {
		const fetchData = async () => {
			let url =
				"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=";
			coinData.forEach((coin) => (url += coin.id + "%2C"));
			url +=
				"&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d";
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Could not fetch market data.");
			}
			const data = await response.json();
			console.log(data);
			return data;
		};
		try {
			const marketData = await fetchData();
			marketData.forEach((coin) => {
				dispatch(marketDataActions.addData(coin));
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// call market_chart url for market data OVER TIME

// ⎈ ⏣ ⎈ ⏣ ⎈ ⏣ - - COMBINE ACCOUNT w/ MARKET DATA - - ⏣ ⎈ ⏣ ⎈ ⏣ ⎈

// update account with values calculated with current market data
export const buildCurrentAccount = () => {};
