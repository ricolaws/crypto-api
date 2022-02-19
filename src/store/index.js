import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { accountSlice } from "./accountSlice";
import { sequenceSlice } from "./sequenceSlice";
import { marketDataSlice } from "./marketDataSlice";
import { dailyDataSlice } from "./dailyDataSlice";
import { uiSlice } from "./uiSlice";

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		account: accountSlice.reducer,
		sequence: sequenceSlice.reducer,
		marketData: marketDataSlice.reducer,
		dailyData: dailyDataSlice.reducer,
		ui: uiSlice.reducer,
	},
});

export default store;
