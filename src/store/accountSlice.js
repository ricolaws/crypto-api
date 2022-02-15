import { createSlice } from "@reduxjs/toolkit";

// the primary store of account data
// the ready prop is true when the account has been fetched from firebase
// and the current market data has been collected from the coin gecko API.
// this triggers the buildCurrentAccount action and ready becomes false again.
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
	},
});

export const accountActions = accountSlice.actions;
