import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import classes from "./PortfolioLineChart.module.css";
import Card from "./Card";
import pattern from "patternomaly";
// import { colorList, colorPatterns } from "./theme/colorPatterns";

function PortfolioLineChart(props) {
  const [priceData, setPriceData] = useState([]);
  const [chartData, setChartData] = useState();
  const [key, setKey] = useState(0);

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
        let c = i;
        if (c > props.colors.length) {
          c -= props.colors.length;
        }
        const pats = ["diagonal-right-left", "cross-dash", "zigzag", "weave"];
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
          fill: true,
          borderColor: pattern.draw(
            pats[c],
            props.colors[c],
            "hsl(0, 0, 0, 0)"
          ),
          backgroundColor: pattern.draw(
            pats[c],
            props.colors[c],
            "hsl(0 0 0 0)"
          ),
          tension: 0.2,
          borderWidth: 2,
          hidden: true,
        };
        chartDataObj.datasets.push(dataSet);
      });

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

  useEffect(() => {
    if (chartData) {
      const chartDataCopy = chartData;
      const newKey = key + 1;
      const index = chartData.datasets.findIndex(
        ({ label }) => label === props.featuredAsset.id
      );

      chartDataCopy.datasets.forEach((dataset, i) => {
        if (i < chartDataCopy.datasets.length - 1) {
          dataset.hidden = true;
        }
      });
      chartDataCopy.datasets[index].hidden = false;

      setChartData(chartDataCopy);
      setKey(newKey);
    }
  }, [props.featuredAsset]);

  return (
    <Card>
      <div className={classes.container}>
        {chartData ? (
          <Line key={key} data={chartData} options={chartOptions} />
        ) : null}
      </div>
    </Card>
  );
}

export default PortfolioLineChart;
