import React, { useState, useEffect } from "react";
import axios from "axios";
import CoinInfo from "../components/CoinInfo";
import { buildUserData } from "../components/UserData";
import PortfolioChart from "../components/PortfolioChart";
import PortfolioLineChart from "../components/PortfolioLineChart";
import MiniChart from "../components/MiniChart";
import ValueAndCost from "../components/ValueAndCost";
import classes from "./Dashboard.module.css";

function Dashboard(props) {
  const [userData, setUserData] = useState({ userAssets: [] });
  const [featuredAsset, setFeaturedAsset] = useState("");
  const [account, setAccount] = useState(props.account);
  const [coinList, setCoinList] = useState();

  useEffect(() => {
    const coinListArr = account.assetData.map((coin) => coin.id);
    setCoinList(coinListArr);

    let url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=";

    for (let i = 0; i < account.assetData.length; i++) {
      url += account.assetData[i].id + "%2C";
    }
    url +=
      "&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d";

    axios
      .get(url)
      .then((response) => {
        setUserData(buildUserData(response.data, account.assetData));
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("USERDATA:", userData);

  const clickAssetHandler = (asset) => {
    setFeaturedAsset(userData.userAssets[asset]);
  };

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.item_a}>
          {userData ? (
            <ValueAndCost
              value={userData.portfolioValue}
              cost={props.account.portfolioCost}
            />
          ) : null}
        </div>
        <div className={classes.item_b}>
          {featuredAsset ? (
            <MiniChart
              id={featuredAsset.id}
              name={featuredAsset.name}
              symbol={featuredAsset.symbol}
              value={featuredAsset.current_value}
              price={featuredAsset.current_price}
            />
          ) : (
            ""
          )}
        </div>
        <div className={classes.item_c}>
          <PortfolioLineChart
            coins={coinList}
            amounts={userData.userAssets}
            data={userData}
          />
        </div>
        <div className={classes.item_d}>D</div>
        <div className={classes.item_e}>E</div>
        <div className={classes.portfolio_chart}>
          <div className={classes["inner-circle"]}>
            {featuredAsset ? <p>{featuredAsset.name}</p> : null}
          </div>
          <PortfolioChart onInspectAsset={clickAssetHandler} data={userData} />
        </div>
      </div>
      {userData.userAssets.map((coin) => {
        return (
          <CoinInfo
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
