import React, { useState, useEffect } from "react";
import axios from "axios";
import CoinInfoBrowse from "../components/CoinInfoBrowse";
import Search from "../components/Search";

function BrowseCoins() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        setCoins(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <React.Fragment>
      <header className="App-header">
        <h1>Search a Coin 🕵️‍♀️💰</h1>
      </header>
      <Search onSearch={handleSearch} />
      {filteredCoins.map((coin) => {
        return (
          <CoinInfoBrowse
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
    </React.Fragment>
  );
}

export default BrowseCoins;
