import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import pattern from "patternomaly";
import { colorPatterns } from "../theme/colorPatterns";
import useWindowDimensions from "../hooks/getWindowDimensions";
import { contrastColor } from "../logic/helpers";

function PortfolioChart(props) {
	const [portfolioChartData, setPortfolioChartData] = useState();
	const { width } = useWindowDimensions();

	const clickHandler = (_, item) => {
		if (item.length > 0) {
			props.onSetFeaturedCoin(item[0].index);
		}
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		cutout: Math.min(width / 11, 120),
		plugins: {
			legend: {
				position: "left",
				align: "start",
				labels: {
					color: "#161515",
					boxWidth: 50,
					padding: 20,
				},
			},
		},
		onClick: clickHandler,
	};

	useEffect(() => {
		const chartData = {
			datasets: [
				{
					label: "Portfolio",
					// backgroundColor: "#005",
					hoverOffset: 20,
					borderWidth: 0,
					borderColor: "#161515",
					hoverBorderWidth: 0,
					borderRadius: 0,
					spacing: 0,
				},
			],
		};

		chartData.datasets[0].backgroundColor = colorPatterns.map((_, i) => {
			return pattern.draw(
				colorPatterns[i][1],
				colorPatterns[i][0],
				contrastColor(colorPatterns[i][0]),
				15
			);
		});
		chartData.labels = props.data.map((coin) => {
			return coin.name;
		});

		chartData.datasets[0].data = props.data.map((coin) => {
			return coin.currentValue;
		});

		setPortfolioChartData(chartData);
	}, [props.data]);

	return (
		<React.Fragment>
			{portfolioChartData ? (
				<Doughnut data={portfolioChartData} options={chartOptions} />
			) : null}
		</React.Fragment>
	);
}

export default PortfolioChart;
