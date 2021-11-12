import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

function MiniChart(props) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${props.id}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h%2C7d`;

    axios
      .get(url)
      .then((response) => {
        setChartData(response.data[0].sparkline_in_7d.price);
      })
      .catch((error) => console.log(error));
  }, [props.id]);

  const miniOptions = {
    responsive: true,
    legend: {
      display: false,
    },
    elements: {
      line: {
        borderColor: "white",
        borderWidth: 3,
        tension: 0.32,
      },
      point: {
        radius: 0,
      },
    },
    tooltips: {
      enabled: false,
    },
  };

  const lineData = {
    labels: ["M", "T", "W", "Th", "F", "S", "S"],

    datasets: [
      {
        data: chartData,
      },
    ],
  };

  return (
    <React.Fragment>
      <h2>
        {props.symbol.toUpperCase()} . . . . . ${props.price.toFixed(2)}
      </h2>
      <Line data={lineData} options={miniOptions} />
    </React.Fragment>
  );
}

export default MiniChart;
