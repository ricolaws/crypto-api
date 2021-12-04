import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import * as colors from "../theme/colors.module.css";

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
            colors.color1,
            colors.color2,
            colors.color3,
            colors.color4,
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
