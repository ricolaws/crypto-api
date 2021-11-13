import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import classes from "./PortfolioLineChart.module.css";

function PortfolioLineChart(props) {
  const [priceData, setPriceData] = useState();
  const [chartData, setChartData] = useState();

  const getCurrentTimeFromStamp = (timeStamp) => {
    var d = new Date(timeStamp);
    const timeStampCon = d.getMonth() + "/" + d.getDate();
    return timeStampCon;
  };

  useEffect(() => {
    if (props.assets) {
      const coinIDs = Object.getOwnPropertyNames(props.assets);

      let endPoints = coinIDs.map(
        (coin) =>
          `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=30&interval=daily`
      );
      Promise.all(endPoints.map((endPoint) => axios.get(endPoint))).then(
        (data) =>
          setPriceData(
            data.map((coin) => {
              return {
                [coin.request.responseURL
                  .replace("https://api.coingecko.com/api/v3/coins/", "")
                  .replace(
                    "/market_chart?vs_currency=usd&days=30&interval=daily",
                    ""
                  )]: coin.data.prices,
              };
            })
          )
      );
    }
  }, [props.assets]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    elements: {
      line: {
        borderColor: "white",
        borderWidth: 3,
        tension: 0.2,
      },
      point: {
        radius: 0,
      },
    },
  };

  useEffect(() => {
    if (priceData) {
      // combined portfolio value data set
      const valuez = priceData.map((coin) => Object.values(coin));
      console.log("VALUEZ", valuez);

      // const portfolioTotalData = [valuez[1][0].map((arr) => arr.slice(-1))];
      const [prices1, prices2, prices3, prices4] = valuez.map((val) =>
        val[0].map((arr) => parseFloat(arr.slice(-1)))
      );
      var summedValueData = prices1.map(
        (e, i) => e + prices2[i] + prices3[i] + prices4[i]
      );
      console.log(summedValueData);
      console.log(priceData[0].solana);
      const dateLabels = priceData[0].solana
        .map((el) => el[0])
        .map((date) => getCurrentTimeFromStamp(date));

      const chartDataHere = {
        labels: dateLabels,

        datasets: [
          // {
          //   label: "My First Dataset",
          //   data: priceData[0].solana.map((el) => el[1]),
          // },
          {
            label: "Total Portfolio Value",
            data: summedValueData,
          },
        ],
      };
      setChartData(chartDataHere);
    }
  }, [priceData]);

  return (
    <div className={classes.container}>
      {chartData ? <Line data={chartData} options={chartOptions} /> : null}
    </div>
  );
}

export default PortfolioLineChart;
