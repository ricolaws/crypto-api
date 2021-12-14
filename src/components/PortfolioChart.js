import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import * as colors from "../theme/colors.module.css";
import pattern from "patternomaly";

function PortfolioChart(props) {
  const [portfolioChartData, setPortfolioChartData] = useState();

  const clickHandler = (evt, item) => {
    if (item.length > 0) {
      props.onSetFeaturedAsset(item[0].index);
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: 80,
    plugins: {
      legend: {
        position: "left",
        align: "start",
      },
    },
    onClick: clickHandler,
  };

  useEffect(() => {
    const chartData = {
      datasets: [
        {
          label: "Portfolio",
          backgroundColor: [
            pattern.draw("diagonal-right-left", colors.color1, "#000"),
            pattern.draw(
              "cross-dash",
              "hsla(164, 90%, 85%, 1)",
              "hsla(164, 40%, 25%, 1)"
            ),
            pattern.draw("zigzag", colors.color3, "#000"),
            pattern.draw("weave", colors.color4, "hsla(184, 70%, 15%, 1)"),
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
    // console.log(chartData);
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
