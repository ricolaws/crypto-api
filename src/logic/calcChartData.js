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

	data.forEach((coin, index) => {
		// take the length of prices and grab that many elements from the end of totals array
		const timescale = coin.prices.length;
		const relevantTotals = coin.dailyTotals.slice(timescale * -1);
		let values = coin.prices.map((arr, i) => arr[1] * relevantTotals[i].amount);

		// assign color and pattern
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
			hidden: true,
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
