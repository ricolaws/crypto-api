import { accountActions } from "./accountSlice";
import { sequenceActions } from "./sequenceSlice";
import { marketDataActions } from "./marketDataSlice";
import { dailyDataActions } from "./dailyDataSlice";
import { orderMovsByDate } from "../logic/calcAccountFunctions";
import { uiActions } from "./uiSlice";
import {
	calcCoinTotals,
	calcAverageCosts,
	calcDailyTotals,
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
			orderMovsByDate(accountData.coinData);
			dispatch(
				accountActions.updateAccount({
					id: accountData.id,
					userName: accountData.userName,
					portfolioValue: accountData.portfolioValue,
					portfolioCost: accountData.portfolioCost,
					coinData: accountData.coinData || [],
				})
			);
			dispatch(sequenceActions.needMarketData(true));
		} catch (error) {
			console.log(error);
		}
	};
};

// sendAccountData - replace account in firebase with the one in redux
// maybe be selective about what current coin data is stored?
export const sendAccountData = (account) => {
	return async (dispatch) => {
		console.log("sendAccount");
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
						portfolioROI: account.portfolioROI,
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
			return data;
		};
		try {
			const marketData = await fetchData();
			marketData.forEach((coin) => {
				dispatch(marketDataActions.addData(coin));
			});
			dispatch(sequenceActions.needMarketData(false));
			dispatch(sequenceActions.needDailyData(true));
		} catch (error) {
			console.log(error);
		}
	};
};

// fetch daily market data
// learn how to get ALL the data then dispatch ONE action after await.
export const fetchDailyMarketData = (coinData) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const coinIDs = coinData.map((coin) => coin.id);

			let urls = coinIDs.map((coin) => {
				return {
					id: coin,
					url: `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=90&interval=daily`,
				};
			});

			Promise.all(
				urls.map(async (obj) => {
					const response = await fetch(obj.url);
					const data = await response.json().then((data) => data.prices);
					console.log(data);
					const dailyPricesObj = {
						id: obj.id,
						prices: data,
					};
					dispatch(dailyDataActions.addPrices(dailyPricesObj));
				})
			);
		};
		try {
			await fetchData();
			dispatch(sequenceActions.needDailyData(false));
			dispatch(sequenceActions.readyToBuild(true));
		} catch (error) {
			console.log(error);
		}
	};
};

// ⎈ ⏣ ⎈ ⏣ ⎈ ⏣ - - COMBINE ACCOUNT w/ MARKET DATA - - ⏣ ⎈ ⏣ ⎈ ⏣ ⎈
// update account with values calculated from current market data
export const buildCurrentAccount = (marketData, account) => {
	return async (dispatch) => {
		const combineData = async () => {
			// combine data
			const coinDataArray = marketData.map((coin) => {
				const [matchedData] = account.coinData.filter(
					(data) => data.id === coin.id
				);
				const coinDataObj = {
					...coin,
					...matchedData,
					currentValue: coin.currentPrice * matchedData.totalAmount,
					totalCost: matchedData.averageCost * matchedData.totalAmount,
				};
				coinDataObj.roi =
					(coinDataObj.currentValue / coinDataObj.totalCost) * 100;
				return coinDataObj;
			});
			const portfolioVal = coinDataArray
				.map((coin) => coin.currentValue)
				.reduce((a, b) => a + b);

			// this could go elsewhere...?
			const portfolioTotalCost = coinDataArray
				.map((coin) => coin.totalCost)
				.reduce((a, b) => a + b);

			const portfolioROI = (portfolioVal / portfolioTotalCost) * 100;

			return {
				...account,
				coinData: coinDataArray,
				portfolioValue: portfolioVal,
				portfolioCost: portfolioTotalCost,
				portfolioROI: portfolioROI,
			};
		};
		const combinedData = await combineData();
		const dailyTotals = combinedData.coinData.flatMap((coin) =>
			calcDailyTotals(coin)
		);
		dailyTotals.forEach((coin) => dispatch(dailyDataActions.addTotals(coin)));

		dispatch(accountActions.updateAccount(combinedData));
		dispatch(sequenceActions.readyToBuild(false));
		dispatch(uiActions.showDashboard(true));
	};
};
