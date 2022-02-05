// functions for calculating values in the user account

// calc totals amount and total cost of each individual coin. takes account.coinData array as arg
export const calcCoinTotals = (arr) => {
	arr.forEach((coin) => {
		coin.totalAmount = coin.movements
			.map((mov) => mov.amount)
			.reduce((a, b) => a + b);
		coin.totalCost = coin.movements
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
export function getDailyTotals(coin) {
	console.log(coin);
	const dailyTotals = [];
	const rightNow = new Date();
	// be sure that the movements are in chronological order
	const movs = coin.movements.sort((a, b) => a.date - b.date);
	const addDays = function (days) {
		const date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	};

	let runningTotal = 0;
	for (let i = 0; i <= movs.length - 1; i++) {
		let currentDate = movs[i].date;
		runningTotal += movs[i].amount;

		if (movs[i + 1]) {
			while (currentDate < movs[i + 1].date) {
				dailyTotals.push({ date: currentDate, amount: runningTotal });
				currentDate = addDays.call(currentDate, 1);
			}
		} else {
			while (currentDate <= rightNow) {
				dailyTotals.push({ date: currentDate, amount: runningTotal });
				currentDate = addDays.call(currentDate, 1);
			}
		}
	}
	coin.dailyTotals = dailyTotals;
}

// ⎈ ⏣ ⎈ ⏣ ⎈ ⏣ - - COMBINE ACCOUNT w/ MARKET DATA - - ⏣ ⎈ ⏣ ⎈ ⏣ ⎈
// update account with values calculated with current market data
export const buildCurrentAccount = (marketData, coinData) => {
	const coinDataArray = marketData.map((coin) => {
		const [matchedData] = coinData.filter((data) => data.id === coin.id);
		const coinDataObj = {
			...coin,
			...matchedData,
			currentValue: coin.currentPrice * matchedData.totalAmount,
			totalCost: matchedData.averageCost * matchedData.totalAmount,
		};
		coinDataObj.roi = (coinDataObj.currentValue / coinDataObj.totalCost) * 100;
		return coinDataObj;
	});

	const portfolioVal = coinDataArray
		.map((coin) => coin.currentValue)
		.reduce((a, b) => a + b);

	// this could go elsewhere...
	const portfolioTotalCost = coinDataArray
		.map((coin) => coin.totalCost)
		.reduce((a, b) => a + b);

	console.log(coinDataArray[0]);
	// coinDataArray.forEach((coin) => getDailyTotals(coin));

	return {
		coinData: coinDataArray,
		portfolioValue: portfolioVal,
		portfolioCost: portfolioTotalCost,
	};
};
