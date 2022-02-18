import { createSlice } from "@reduxjs/toolkit";
import {
	calcCoinTotals,
	calcAverageCosts,
	calcROI,
	orderMovsByDate,
} from "../logic/calcAccountFunctions";

// the primary store of account data
const initialAccountState = {
	id: null,
	userName: "",
	portfolioValue: 0,
	portfolioCost: 0,
	portfolioROI: 0,
	coinData: [],
};

export const accountSlice = createSlice({
	name: "account",
	initialState: initialAccountState,
	reducers: {
		replaceAccount(state, action) {
			state.id = action.payload.id;
			state.userName = action.payload.userName;
			state.portfolioValue = action.payload.portfolioValue;
			state.portfolioCost = action.payload.portfolioCost;
			state.portfolioROI = action.payload.portfolioROI;
			state.coinData = action.payload.coinData;
		},
		updateAccount(state, action) {
			return Object.assign(state, action.payload);
		},
		// payload {newMovement: {}, index: num }
		addTrade(state, action) {
			const trade = action.payload.newMovement;
			const i = action.payload.index;
			const matchedCoin = state.coinData[i];
			// add the new movement to the correct coin movements array
			matchedCoin.movements.push(trade);
			// calc total val / cost, average cost, and ROI of coin
			calcCoinTotals(state.coinData);
			calcAverageCosts(state.coinData);
			matchedCoin.currentValue =
				matchedCoin.currentPrice * matchedCoin.totalAmount;
			matchedCoin.roi = calcROI(
				matchedCoin.currentValue,
				matchedCoin.totalCost
			);
			// order Movements
			orderMovsByDate(state.coinData);
			// portfolio totalCost, currentVal, and ROI
			state.portfolioValue = state.coinData
				.map((coin) => coin.currentValue)
				.reduce((a, b) => a + b);
			state.portfolioCost = state.coinData
				.map((coin) => coin.totalCost)
				.reduce((a, b) => a + b);
			state.portfolioROI = calcROI(state.portfolioValue, state.portfolioCost);
		},
	},
});

export const accountActions = accountSlice.actions;
