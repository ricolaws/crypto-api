import React from "react";
import { Doughnut } from "react-chartjs-2";

function PortfolioChart(props) {
  const clickHandler = (evt, item) => {
    if (item.length > 0) {
      props.onInspectAsset(item[0].index);
    }
  };

  return (
    <div>
      <Doughnut data={props.data} options={{ onClick: clickHandler }} />
    </div>
  );
}

export default PortfolioChart;
