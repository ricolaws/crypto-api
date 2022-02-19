import { createSlice } from "@reduxjs/toolkit";

//  rename. totals: prices:
export const dailyDataSlice = createSlice({
	name: "dailyData",
	initialState: { data: [] },
	reducers: {
		addTotals(state, action) {
			const newCoin = action.payload;
			const existingCoin = state.data.find((coin) => coin.id === newCoin.id);
			if (!existingCoin) {
				state.data.push(newCoin);
			} else {
				existingCoin.dailyTotals = newCoin.dailyTotals;
			}
		},
		addPrices(state, action) {
			const newCoin = action.payload;
			const existingCoin = state.data.find((coin) => coin.id === newCoin.id);
			if (!existingCoin) {
				state.data.push(newCoin);
			} else {
				existingCoin.prices = newCoin.prices;
			}
		},
	},
});

export const dailyDataActions = dailyDataSlice.actions;
