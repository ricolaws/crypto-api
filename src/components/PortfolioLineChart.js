import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { calcChartData } from "../logic/calcChartData";
import classes from "./PortfolioLineChart.module.css";
import { colorList, colorPatterns } from "../theme/colorPatterns";

function PortfolioLineChart(props) {
	const dailyData = useSelector((state) => state.dailyData.data);
	const account = useSelector((state) => state.account);
	const featuredCoin = useSelector((state) => state.ui.featured);
	const [chartData, setChartData] = useState();

	const [key, setKey] = useState(0);

	const chartOptions = {
		plugins: {
			legend: {
				display: false,
			},
		},
		responsive: true,
		maintainAspectRatio: false,
		layout: {
			padding: {
				top: 5,
				left: 5,
				right: 5,
				bottom: 5,
			},
		},
		elements: {
			line: {
				borderColor: "black",
				borderWidth: 2,
				tension: 0.3,
			},
			point: {
				radius: 0,
			},
		},
	};

	// price data is url response, props.data is account
	// checking to see if all price data is available, then calling calcChart Data.

	useEffect(() => {
		if (dailyData) {
			const priceDataIsMissing = dailyData
				.map((coin) => coin.prices)
				.some((el) => el === undefined);
			if (!priceDataIsMissing) {
				const valuesOverTime = calcChartData(dailyData, account.coinData);
				setChartData(valuesOverTime);
			}
			// console.log(chartData.labels, chartData.datasets[0].data);
		}
	}, [dailyData, account]);

	// useEffect(() => {
	// 	if (chartData) {
	// 		const chartDataCopy = chartData;
	// 		const newKey = key + 1;
	// 		const index = chartData.datasets.findIndex(
	// 			({ label }) => label === props.featuredAsset.id
	// 		);

	// 		chartDataCopy.datasets.forEach((dataset, i) => {
	// 			if (i < chartDataCopy.datasets.length - 1) {
	// 				dataset.hidden = true;
	// 			}
	// 		});
	// 		chartDataCopy.datasets[index].hidden = false;

	// 		setChartData(chartDataCopy);
	// 		setKey(newKey);
	// 	}
	// }, [props.featuredAsset]);

	return (
		<div className={classes.container}>
			{chartData ? (
				<Line key={key} data={chartData} options={chartOptions} />
			) : null}
		</div>
	);
}

export default PortfolioLineChart;
