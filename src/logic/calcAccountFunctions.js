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

export const getDateFromStamp = (timeStamp) => {
	var d = new Date(timeStamp);
	const TSConverted = d.getMonth() + 1 + "/" + d.getDate();
	return TSConverted;
};

// derives the total amount of a coin in the account on a per day basis
// from the time the first puchase was made up to the current date.

// is the problem here with my dates???
// is it hat i need to convert from timestamp?? can i handle this in portfolio line chart?
export function getDailyTotals(coin) {
	// copy movements array so we aren't manipulating state, then arrange in chronological order.
	const copy = [...coin.movements];
	const movs = copy.sort((a, b) => a.date - b.date);

	const dailyTotals = [];
	const rightNow = new Date();
	const addDays = function (days) {
		const date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	};

	// from portfolio line chart after daily values are fetched

	// const [timestamps] = Object.values(priceData[0]);
	// const dateLabels = timestamps.map((date) => getDateFromStamp(date[0]));

	let runningTotal = 0;

	for (let i = 0; i <= movs.length - 1; i++) {
		let selectedDate = movs[i].date;
		runningTotal += movs[i].amount;

		console.log(rightNow);

		if (movs[i + 1]) {
			console.log(selectedDate < movs[i + 1].date);
			while (selectedDate < movs[i + 1].date) {
				console.log("while");
				dailyTotals.push({ date: selectedDate, amount: runningTotal });
				selectedDate = addDays.call(selectedDate, 1);
			}
		} else {
			while (selectedDate <= rightNow) {
				dailyTotals.push({ date: selectedDate, amount: runningTotal });
				selectedDate = addDays.call(selectedDate, 1);
			}
		}
		console.log(dailyTotals);
	}

	// coin.dailyTotals = dailyTotals;
}
