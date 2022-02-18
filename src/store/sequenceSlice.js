import { createSlice } from "@reduxjs/toolkit";

export const sequenceSlice = createSlice({
	name: "sequence",
	initialState: {
		needMarketData: false,
		needDailyData: false,
		buildAccount: false,
		sendAccount: false,
	},
	reducers: {
		needMarketData(state, action) {
			state.needMarketData = action.payload;
		},
		needDailyData(state, action) {
			state.needDailyData = action.payload;
		},
		readyToBuild(state, action) {
			state.buildAccount = action.payload;
		},
		sendAccount(state, action) {
			state.sendAccount = action.payload;
		},
	},
});

export const sequenceActions = sequenceSlice.actions;
