import { createSlice } from "@reduxjs/toolkit";

const initialAccountState = {};
// const initialAccountState = {
//     id: 0,
//     userName: "Elvad",
//     portfolioValue: 0,
//     portfolioCost: 0,
//     coinData: [
//         {
//           id: "solana",
//           averageCost: 2,
//           total: 120,
//           movements: [
//             { date: new Date("2021-09-27"), amount: 60, price: 90.9 },
//             { date: new Date("2021-06-27"), amount: 70, price: 180.88 },
//             { date: new Date("2020-11-07"), amount: 30, price: 206.88 },
//           ],
//         },
//         {
//           id: "dogecoin",
//           total: 10000,
//           movements: [
//             { date: new Date("2020-10-27"), amount: 40000, price: 0.2595 },
//           ],
//         },
//         {
//           id: "matic-network",
//           total: 1000,
//           movements: [
//             { date: new Date("2021-10-27"), amount: 2500, price: 0.01509 },
//             { date: new Date("2020-10-27"), amount: 500, price: 1.9509 },
//           ],
//         },
//         {
//           id: "bitcoin",
//           total: 0.2,
//           movements: [
//             { date: new Date("2021-10-27"), amount: 0.3, price: 33901.0 },
//             { date: new Date("2020-10-27"), amount: 0.1, price: 47500.88 },
//           ],
//         },
//         {
//           id: "ethereum",
//           total: 0.9,
//           movements: [
//             { date: new Date("2021-05-27"), amount: 0.4, price: 3201.0 },
//             { date: new Date("2020-11-27"), amount: 1.5, price: 2900.98 },
//           ],
//         },
//       ],
// }

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
		updateAccount(state) {},
	},
});

export const accountActions = accountSlice.actions;
