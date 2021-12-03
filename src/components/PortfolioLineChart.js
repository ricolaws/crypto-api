import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import classes from "./PortfolioLineChart.module.css";

function PortfolioLineChart(props) {
  const [priceData, setPriceData] = useState([]);
  const [chartData, setChartData] = useState();

  const getDateFromStamp = (timeStamp) => {
    var d = new Date(timeStamp);
    const TSConverted = d.getMonth() + 1 + "/" + d.getDate();
    return TSConverted;
  };

  useEffect(() => {
    if (props.data) {
      const coinIDs = props.data.userAssets.map((coin) => coin.id);

      let endPoints = coinIDs.map(
        (coin) =>
          `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=90&interval=daily`
      );

      Promise.all(endPoints.map((endPoint) => axios.get(endPoint))).then(
        (data) =>
          setPriceData(
            data.map((coin) => {
              return {
                // do i need to do this?
                [coin.request.responseURL
                  .replace("https://api.coingecko.com/api/v3/coins/", "")
                  .replace(
                    "/market_chart?vs_currency=usd&days=90&interval=daily",
                    ""
                  )]: coin.data.prices,
              };
            })
          )
      );
    }
  }, [props.data]);

  const chartOptions = {
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
    legend: {
      display: false,
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

  // const chartOptions = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   scales: {
  //     xAxes: [
  //       {
  //         ticks: { display: false },
  //         gridLines: {
  //           display: false,
  //           drawBorder: false,
  //         },
  //       },
  //     ],
  //     yAxes: [
  //       {
  //         ticks: { display: false },
  //         gridLines: {
  //           display: false,
  //           drawBorder: false,
  //         },
  //       },
  //     ],
  //   },
  // };

  useEffect(() => {
    if (priceData.length && props.data) {
      const summedValues = [];
      const chartDataObj = { labels: [], datasets: [] };
      const [timestamps] = Object.values(priceData[0]);
      const dateLabels = timestamps.map((date) => getDateFromStamp(date[0]));

      chartDataObj.labels = dateLabels;

      priceData.forEach((coinObj, i) => {
        const [id] = Object.keys(coinObj);
        const [prices] = Object.values(coinObj);
        const [filteredByCoin] = props.data.userAssets.filter(
          (coin) => coin.id === id
        );
        // remove last element from prices to correct for extra data point on current day
        prices.pop();
        const amounts = filteredByCoin.dailyTotals.slice(-prices.length);

        // loop over prices array multiplying amount by value and combine with timestamp
        summedValues[i] = prices.map((arr, j) => arr[1] * amounts[j].amount);

        const dataSet = {
          label: id,
          data: summedValues[i],
          borderColor: "#98B9AB",
          fill: true,
          borderColor: "#04724D",
          backgroundColor: "rgba(4, 114, 77, .25)",
          tension: 0.2,
          borderWidth: 2,
        };
        chartDataObj.datasets.push(dataSet);
      });

      const ids = priceData.map((obj) => Object.keys(obj)).flat();

      // corect dateLabels array to match summed values
      if (dateLabels.length > summedValues.length) {
        dateLabels.pop();
      }

      const totalPortfolioValue = summedValues.reduce(
        (r, a) => a.map((b, i) => (r[i] || 0) + b),
        []
      );

      chartDataObj.datasets.push({
        label: "total value",
        data: totalPortfolioValue,
      });

      setChartData(chartDataObj);
    }
  }, [priceData, props.data]);

  return (
    <div className={classes.container}>
      {chartData ? <Line data={chartData} options={chartOptions} /> : null}
    </div>
  );
}

export default PortfolioLineChart;
