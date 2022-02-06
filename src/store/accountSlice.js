import { createSlice } from "@reduxjs/toolkit";

const initialAccountState = { data: {}, ready: false };

export const accountSlice = createSlice({
	name: "account",
	initialState: initialAccountState,
	reducers: {
		changeReady(state, action) {
			state.ready = action.payload;
		},
		replaceAccount(state, action) {
			state.data.id = action.payload.id;
			state.data.userName = action.payload.userName;
			state.data.portfolioValue = action.payload.portfolioValue;
			state.data.portfolioCost = action.payload.portfolioCost;
			state.data.portfolioROI = action.payload.portfolioROI;
			state.data.coinData = action.payload.coinData;
		},
		updateAccount(state, action) {
			return Object.assign(state, action.payload);
		},
	},
});

export const accountActions = accountSlice.actions;
