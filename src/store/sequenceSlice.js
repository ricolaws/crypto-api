import { createSlice } from "@reduxjs/toolkit";

export const sequenceSlice = createSlice({
	name: "sequence",
	initialState: {
		needMarketData: false,
		needDailyData: false,
		dataIsReady: false,
	},
	reducers: {
		needMarketData(state, action) {
			state.needMarketData = action.payload;
		},
		needDailyData(state, action) {
			state.needDailyData = action.payload;
		},
		readyToBuild(state, action) {
			state.dataIsReady = action.payload;
		},
	},
});

export const sequenceActions = sequenceSlice.actions;
