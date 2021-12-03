import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

function PortfolioChart(props) {
  const [portfolioChartData, setPortfolioChartData] = useState();

  const clickHandler = (evt, item) => {
    if (item.length > 0) {
      props.onInspectAsset(item[0].index);
    }
  };

  // console.log(props.data);

  useEffect(() => {
    const chartData = {
      datasets: [
        {
          options: {
            onClick: () => {},
          },
          label: "Portfolio",
          backgroundColor: ["green", "palegreen", "blue", "red"],
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
        <Doughnut
          data={portfolioChartData}
          options={{ onClick: clickHandler }}
        />
      ) : null}
    </React.Fragment>
  );
}

export default PortfolioChart;
