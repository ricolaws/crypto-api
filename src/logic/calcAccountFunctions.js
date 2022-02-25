// functions for calculating values in the user account

// could change this to run on individual coins...
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

// could change this to run on individual coins...
// calc average cost of each individual coin. takes account.coinData array as arg
export const calcAverageCosts = (arr) => {
	arr.map(
		(coin) =>
			(coin.averageCost =
				coin.movements.map((mov) => mov.price).reduce((a, b) => a + b) /
				coin.movements.length)
	);
};

// could change this to run on individual coins...
// put the movements array in order by date. starting with oldest date
export const orderMovsByDate = (coinData) => {
	coinData.forEach((coin, i) => {
		coin.movements = coin.movements
			.map((mov) => mov)
			.sort((a, b) => new Date(a.date) - new Date(b.date));
	});
};

// calculate return on investment
export const calcROI = (value, cost) => {
	const netReturn = value - cost;
	return (netReturn / cost) * 100;
};

export const calcDailyTotals = (coin) => {
	const dailyTotals = [];
	const rightNow = new Date();

	const copy = Object.assign({}, coin);
	const movs = copy.movements.map((el) => {
		return {
			price: el.price,
			amount: el.amount,
			date: new Date(el.date),
		};
	});
	// function returns a date one day later
	const addDays = function (days) {
		const date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	};

	// how much of the coin is in the portfolio
	let runningTotal = 0;
	// loop thru movs starting with the first purchase, at every new movement add amount to runningTotal
	for (let i = 0; i <= movs.length - 1; i++) {
		let currentDate = movs[i].date;
		runningTotal += movs[i].amount;

		// if you still have more movements to go thru..
		if (movs[i + 1]) {
			// produce an object with the date and amount and push this to dailyTotals array,
			// then advance one day and repeat until you reach the next movement.
			while (currentDate < movs[i + 1].date) {
				dailyTotals.push({ date: currentDate.toJSON(), amount: runningTotal });
				currentDate = addDays.call(currentDate, 1);
			}
			// if you have reached the most recent movement continue until you reach the current date.
		} else {
			while (currentDate <= rightNow) {
				dailyTotals.push({ date: currentDate.toJSON(), amount: runningTotal });
				currentDate = addDays.call(currentDate, 1);
			}
		}
	}

	return {
		id: coin.id,
		dailyTotals: dailyTotals,
	};
};
