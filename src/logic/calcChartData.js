import { getDateFromStamp } from "../logic/helpers";
import { addNestedArrays } from "../logic/helpers";
import { colorPatterns } from "../theme/colorPatterns";
import pattern from "patternomaly";

// data = array of objects / {id: 'matic-network', prices: Array(91), dailyTotals: Array(474)}
export const calcChartData = (data, coinData) => {
	// create an array of dates from the priceData array
	const dateLabels = data[0].prices.map((price) => getDateFromStamp(price[0]));

	const chartDataObj = { labels: dateLabels, datasets: [] };
	const allValues = [];
	const patternsArray = data.map((_, i) => {
		return colorPatterns[i];
	});

	console.log(patternsArray);
	data.forEach((coin, index) => {
		// take the length of prices and grab that many elements from the end of totals array
		const timescale = coin.prices.length;
		const relevantTotals = coin.dailyTotals.slice(timescale * -1);
		let values = coin.prices.map((arr, i) => arr[1] * relevantTotals[i].amount);

		// let currentValue = coinData.find(
		// 	(data) => data.id === coin.id
		// ).currentValue;

		const color = pattern.draw(
			patternsArray[index][1],
			patternsArray[index][0],
			"#000"
		);

		const dataSet = {
			label: coin.id,
			data: values,
			fill: true,
			borderColor: color,
			backgroundColor: color,
			tension: 0.2,
			borderWidth: 2,
			hidden: false,
		};
		allValues.push(values);
		chartDataObj.datasets.push(dataSet);
	});
	const totalPortfolioValue = addNestedArrays(allValues);
	chartDataObj.datasets.push({
		label: "total value",
		data: totalPortfolioValue,
		fill: false,
	});
	return chartDataObj;
};

// useEffect(() => {
// 	if (priceData.length && props.data) {
// 		const summedValues = [];
// 		const chartDataObj = { labels: [], datasets: [] };
// 		// create an array of dates from the priceData array
// 		const [timestamps] = Object.values(priceData[0]);
// 		const dateLabels = timestamps.map((date) => getDateFromStamp(date[0]));
// 		//  add dates to chart obj as labels..
// 		chartDataObj.labels = dateLabels;

// 		// loop over priceData array
// 		priceData.forEach((coinObj, i) => {
// 			const [id] = Object.keys(coinObj);
// 			const [prices] = Object.values(coinObj);
// 			// filter account.coinData for matching coin
// 			const [filteredByCoin] = props.data.userAssets.filter(
// 				(coin) => coin.id === id
// 			);
// 			// remove last element from prices to correct for extra data point on current day
// 			prices.pop();
// 			// don't need props.data anymore
// 			const amounts = filteredByCoin.dailyTotals.slice(-prices.length);

// 			// loop over prices array multiplying amount by value and combine with timestamp
// 			summedValues[i] = prices.map((arr, j) => arr[1] * amounts[j].amount);

// 			const dataSet = {
// 				label: id,
// 				data: summedValues[i],
// 				fill: true,
// 				borderColor: props.colors[i],
// 				backgroundColor: props.colors[i],
// 				tension: 0.2,
// 				borderWidth: 2,
// 				hidden: true,
// 			};
// 			// add patterns to chart
// 			dataSet.backgroundColor = pattern.draw(
// 				props.colorPatterns[i][1],
// 				props.colorPatterns[i][0],
// 				"#000"
// 			);

// 			chartDataObj.datasets.push(dataSet);
// 		});

// 		// corect dateLabels array to match summed values
// 		if (dateLabels.length > summedValues.length) {
// 			dateLabels.pop();
// 		}

// 		// ??? confusing...
// 		const totalPortfolioValue = summedValues.reduce(
// 			(r, a) => a.map((b, i) => (r[i] || 0) + b),
// 			[]
// 		);

// 		chartDataObj.datasets.push({
// 			label: "total value",
// 			data: totalPortfolioValue,
// 		});

// 		setChartData(chartDataObj);
// 	}
// }, [priceData, props.data, props.colors]);
