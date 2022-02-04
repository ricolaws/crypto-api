// functions for calculating values in the user account

// calc totals amount and total cost of each individual coin. takes account.coinData array as arg
export const calcCoinTotals = (arr) => {
	arr.forEach((coin) => {
		coin.total = coin.movements
			.map((mov) => mov.amount)
			.reduce((a, b) => a + b);
		coin.total_cost = coin.movements
			.map((mov) => mov.amount * mov.price)
			.reduce((a, b) => a + b);
	});
};

// calc average cost of each individual coin. takes account.coinData array as arg
export const calcAverageCosts = (arr) => {
	arr.map(
		(coin) =>
			(coin.averageCost =
				coin.movements.map((mov) => mov.price).reduce((a, b) => a + b) /
				coin.movements.length)
	);
};

// takes account data combined with api data and adds up the current_value properties then adds the total_cost props
export const calcPortfolioTotals = () => {};

// const portfolioVal = coinDataArray
// 	.map((coin) => {
// 		return coin.current_value;
// 	})
// 	.reduce((a, b) => {
// 		return a + b;
// 	});

// const portfolioTotalCost = coinDataArray
// 	.map((coin) => coin.total_cost)
// 	.reduce((a, b) => {
// 		return a + b;
// 	});
