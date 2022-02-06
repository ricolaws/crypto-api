import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { accountSlice } from "./accountSlice";
import { marketDataSlice } from "./marketDataSlice";
import { uiSlice } from "./uiSlice";

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		account: accountSlice.reducer,
		marketData: marketDataSlice.reducer,
		ui: uiSlice.reducer,
	},
});

export default store;
