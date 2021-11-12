import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

function PValueChart(props) {
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    // console.log(props.assets);
    for (const asset of props.assets) {
      let url = `https://api.coingecko.com/api/v3/coins/${asset.id}/market_chart?vs_currency=usd&days=30&interval=1`;
      let noon = asset.id;
      axios
        .get(url)
        .then((response) => {
          // let name = asset.id;
          // let data = [...priceData, response.data.prices];
          setPriceData({ ...priceData, [`${noon}`]: response.data.prices });
        })
        .catch((error) => console.log(error));
    }
  }, []);

  console.log(priceData);
  return <div>P Value Chart</div>;
}

export default PValueChart;
