import { createSlice } from "@reduxjs/toolkit";

export const marketDataSlice = createSlice({
	name: "marketData",
	initialState: { needData: false, data: [] },
	reducers: {
		needData(state, action) {
			state.needData = action.payload;
		},
		addData(state, action) {
			const newCoin = action.payload;
			const existingCoin = state.data.find((coin) => coin.id === newCoin.id);
			if (!existingCoin) {
				state.data.push({
					id: newCoin.id,
					name: newCoin.name,
					currentPrice: newCoin.current_price,
					image: newCoin.image,
					symbol: newCoin.symbol,
					marketCap: newCoin.market_cap,
					priceChange_24h: newCoin.price_change_percentage_24h,
					priceChange_7d: newCoin.price_change_percentage_7d_in_currency,
					ath: newCoin.ath,
					totalVolume: newCoin.total_volume,
				});
			} else {
				existingCoin.currentPrice = newCoin.currentPrice;
				existingCoin.marketCap = newCoin.market_cap;
				existingCoin.priceChange_24h = newCoin.price_change_percentage_24h;
				existingCoin.priceChange_7d =
					newCoin.price_change_percentage_7d_in_currency;
				existingCoin.ath = newCoin.ath;
				existingCoin.totalVolume = newCoin.total_volume;
			}
		},
	},
});

export const marketDataActions = marketDataSlice.actions;
