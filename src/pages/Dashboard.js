import React, { useState, useEffect } from "react";
import axios from "axios";
import CoinInfo from "../components/CoinInfo";
import { buildUserData } from "../components/UserData";
import PortfolioChart from "../components/PortfolioChart";
import PortfolioLineChart from "../components/PortfolioLineChart";
import Featured from "../components/Featured";
import ValueAndCost from "../components/ValueAndCost";
import classes from "./Dashboard.module.css";
import * as colors from "../theme/colors.module.css";

function Dashboard(props) {
  const [userData, setUserData] = useState({ userAssets: [] });
  const [featuredAsset, setFeaturedAsset] = useState("");
  const [account, setAccount] = useState(props.account);
  const [coinList, setCoinList] = useState();
  const [displayColors, setDisplayColors] = useState();

  useEffect(() => {
    const colorArray = [
      colors.color1,
      colors.color2,
      colors.color3,
      colors.color4,
    ];
    setDisplayColors(colorArray);
  }, []);

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

  const clickAssetHandler = (asset) => {
    setFeaturedAsset(userData.userAssets[asset]);
  };

  console.log(featuredAsset);
  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.item_a}>
          {userData ? (
            <ValueAndCost
              title={"Portfolio"}
              value={userData.portfolioValue}
              cost={props.account.portfolioCost}
            />
          ) : null}
        </div>
        <div className={classes.featured}>
          {featuredAsset ? (
            <ValueAndCost
              title={featuredAsset.symbol.toUpperCase()}
              value={featuredAsset.current_value}
              cost={featuredAsset.total_cost}
            />
          ) : (
            "Select a Coin  →"
          )}
        </div>
        <div className={classes.item_c}>
          <PortfolioLineChart
            featuredAsset={featuredAsset}
            colors={displayColors}
            coins={coinList}
            amounts={userData.userAssets}
            data={userData}
          />
        </div>
        <div className={classes.item_d}>Add Trade</div>
        <div className={classes.item_e}>Trade History</div>
        <div className={classes.portfolio_chart}>
          <PortfolioChart
            onSetFeaturedAsset={clickAssetHandler}
            data={userData}
          />
        </div>
      </div>
      <div className={classes.labelsContainer}>
        <div className={`${classes.rows} ${classes.labels}`}>
          <div className={classes.nameHeading}>Name</div>
          <div className={classes.symbol}>Symbol</div>
          <div>Price</div>
          <div>24hr.</div>
          <div>7d.</div>
          <div>M.Cap</div>
          <div>ROI</div>
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
            priceChange24={coin.price_change_24h}
            priceChange7d={coin.price_change_7d}
            roi={coin.roi}
          />
        );
      })}
    </React.Fragment>
  );
}

export default Dashboard;
