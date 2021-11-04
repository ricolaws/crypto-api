import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "../components/Coin";

const ACCOUNT_1 = {
  id: 1,
  userName: "Elvad Mc",
  assets: ["solana", "dogecoin", "matic-network"],
  balances: [
    {
      asset: "solana",
      total: 100,
      movements: [{ date: "10/27/2020", amount: 100, price: 1.4901 }],
    },
    {
      asset: "dogecoin",
      total: 100,
      movements: [{ date: "10/27/2020", amount: 100, price: 0.002595 }],
    },
    {
      asset: "matic-network",
      total: 100,
      movements: [{ date: "10/27/2020", amount: 100, price: 0.01509 }],
    },
  ],
  pin: 5555,
};

function Dashboard() {
  const [userAssets, setUserAssets] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=solana%2Cdogecoin%2Cmatic-network&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        setUserAssets(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(ACCOUNT_1);

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
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        );
      })}
    </div>
  );
}

export default Dashboard;
