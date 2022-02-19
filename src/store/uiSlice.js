import { createSlice } from "@reduxjs/toolkit";

const initialUIState = {
	showDash: false,
	featured: { none: true },
	display: "Chart",
};

export const uiSlice = createSlice({
	name: "ui",
	initialState: initialUIState,
	reducers: {
		showDashboard(state, action) {
			state.showDash = action.payload;
		},
		setFeatured(state, action) {
			state.featured.id = action.payload.id;
			state.featured.name = action.payload.name;
			state.featured.symbol = action.payload.symbol;
			state.featured.currentValue = action.payload.currentValue;
			state.featured.totalCost = action.payload.totalCost;
			state.featured.roi = action.payload.roi;
			state.featured.none = false;
		},
		setDashboardDisplay(state, action) {
			state.display = action.payload;
		},
	},
});

export const uiActions = uiSlice.actions;
