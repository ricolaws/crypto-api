import React, { useState, useEffect } from "react";
import axios from "axios";
import CoinInfo from "../components/CoinInfo";
import { buildUserAssets, buildUserData } from "../components/UserData";
import PortfolioChart from "../components/PortfolioChart";
import PValueChart from "../components/PValueChart";
import MiniChart from "../components/MiniChart";
import ValueAndCost from "../components/ValueAndCost";
import classes from "./Dashboard.module.css";
import PortfolioValueChart from "../components/PValueChart";

function Dashboard(props) {
  const [userAssets, setUserAssets] = useState([]);
  const [portfolioData, setPortfolioData] = useState();
  const [featuredAsset, setFeaturedAsset] = useState("");
  const [userData, setUserData] = useState(props.account);

  useEffect(() => {
    let url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=";
    for (const asset of userData.assetData) {
      url += asset.id + "%2C";
    }
    url +=
      "&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d";

    axios
      .get(url)
      .then((response) => {
        setUserAssets(buildUserAssets(response.data, userData.assetData));
      })
      .catch((error) => console.log(error));
  }, []);

  // formatting data for Chart.js and updating portfolio value in userData
  useEffect(() => {
    // console.log("userData", userData);
    // console.log("userAssets:", userAssets);
    const portfolioChartData = {
      datasets: [
        {
          options: {
            onClick: () => {},
          },
          label: "Portfolio",
          backgroundColor: ["green", "palegreen", "blue", "red"],
          hoverOffset: 6,
          hoverBorderWidth: 1,
          borderRadius: 0,
          spacing: 0,
        },
      ],
    };
    portfolioChartData.labels = userAssets.map((asset) => {
      return asset.name;
    });

    portfolioChartData.datasets[0].data = userAssets.map((asset) => {
      return asset.current_value;
    });

    setPortfolioData(portfolioChartData);

    // set total portfolio value in userData based on current prices
    let updatedPortfolioValue = portfolioChartData.datasets[0].data;
    if (updatedPortfolioValue.length) {
      setUserData({
        ...userData,
        portfolioValue: updatedPortfolioValue.reduce((a, b) => {
          return a + b;
        }),
      });
    }
  }, [userAssets]);

  const clickAssetHandler = (asset) => {
    setFeaturedAsset(userAssets[asset]);
  };

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.item_a}>
          {userAssets ? (
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
          <PValueChart assets={userAssets} />
        </div>
        <div className={classes.item_d}>D</div>
        <div className={classes.item_e}>E</div>
        <div className={classes.portfolio_chart}>
          {portfolioData ? (
            <PortfolioChart
              onInspectAsset={clickAssetHandler}
              data={portfolioData}
            />
          ) : null}
        </div>
      </div>
      {userAssets.map((coin) => {
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
