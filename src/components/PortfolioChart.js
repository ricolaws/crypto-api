import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import pattern from "patternomaly";
import colorList from "../theme/colorPatterns";
import useWindowDimensions from "../hooks/getWindowDimensions";

function PortfolioChart(props) {
  const [portfolioChartData, setPortfolioChartData] = useState();
  const { height, width } = useWindowDimensions();

  const clickHandler = (evt, item) => {
    if (item.length > 0) {
      props.onSetFeaturedAsset(item[0].index);
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: Math.min(width / 11, 120),
    plugins: {
      legend: {
        position: "top",
        align: "start",
      },
    },
    onClick: clickHandler,
  };

  const contrast2 = "#000";
  useEffect(() => {
    const chartData = {
      datasets: [
        {
          label: "Portfolio",
          backgroundColor: [
            pattern.draw("diagonal-right-left", colorList[0], contrast2),
            pattern.draw("cross-dash", colorList[1], contrast2),
            pattern.draw("zigzag", colorList[2], contrast2),
            pattern.draw("weave", colorList[3], contrast2),
          ],
          hoverOffset: 6,
          hoverBorderWidth: 1,
          borderRadius: 0,
          spacing: 0,
        },
      ],
    };

    chartData.labels = props.data.userAssets.map((asset) => {
      return asset.name;
    });

    chartData.datasets[0].data = props.data.userAssets.map((asset) => {
      return asset.current_value;
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
