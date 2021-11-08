import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "../components/Coin";
import { ACCOUNT_1, buildUserData } from "../components/UserData";

function Dashboard(props) {
  const [userAssets, setUserAssets] = useState([]);

  useEffect(() => {
    let url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=";
    for (const asset of ACCOUNT_1.assetData) {
      url += asset.id + "%2C";
    }
    url +=
      "&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d";

    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setUserAssets(buildUserData(response.data, ACCOUNT_1));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {userAssets.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            image={coin.image}
            symbol={coin.symbol}
            marketCap={coin.market_cap}
            priceChange={coin.price_change_24h}
            volume={coin.total_volume}
            roi={coin.roi}
          />
        );
      })}
    </div>
  );
}

export default Dashboard;
