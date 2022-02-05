import { createSlice } from "@reduxjs/toolkit";

const initialAccountState = {};

export const accountSlice = createSlice({
	name: "account",
	initialState: initialAccountState,
	reducers: {
		replaceAccount(state, action) {
			state.id = action.payload.id;
			state.userName = action.payload.userName;
			state.portfolioValue = action.payload.portfolioValue;
			state.portfolioCost = action.payload.portfolioCost;
			state.coinData = action.payload.coinData;
		},
		updateAccount(state, action) {},
	},
});

export const accountActions = accountSlice.actions;
