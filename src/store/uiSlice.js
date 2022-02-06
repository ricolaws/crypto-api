import { createSlice } from "@reduxjs/toolkit";

const initialUIState = {
	showDash: false,
	featuredCoin: null,
	display: "chart",
};

export const uiSlice = createSlice({
	name: "ui",
	initialState: initialUIState,
	reducers: {
		showDashboard(state, action) {
			state.showDash = action.payload;
		},
		setFeatured(state, action) {
			state.featuredCoin = action.payload;
		},
	},
});

export const uiActions = uiSlice.actions;
