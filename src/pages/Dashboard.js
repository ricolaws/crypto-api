import React, { useState, useEffect } from "react";
import axios from "axios";
import CoinInfo from "../components/CoinInfo";
import { buildUserData } from "../components/UserData";
import PortfolioChart from "../components/PortfolioChart";
import PortfolioLineChart from "../components/PortfolioLineChart";
import ValueAndCost from "../components/ValueAndCost";
import classes from "./Dashboard.module.css";
import AddTradeButton from "../components/AddTradeButton";
import ViewTradesButton from "../components/ViewTradesButton";
import AddTradeWindow from "../components/AddTradeWindow";
import ConditionalDisplay from "../components/ConditionalDisplay";
import useWindowDimensions from "../hooks/getWindowDimensions";

function Dashboard(props) {
  const [userData, setUserData] = useState({ userAssets: [] });
  const [featuredAsset, setFeaturedAsset] = useState("");
  const [coinList, setCoinList] = useState();
  const [displayColors, setDisplayColors] = useState();
  const { height, width } = useWindowDimensions();
  const [conditionalDisplayContent, setConditionalDisplayContent] =
    useState("chart");

  useEffect(() => {
    setDisplayColors(props.colors);
  }, [props.colors]);

  useEffect(() => {
    const coinListArr = props.account.assetData.map((coin) => coin.id);
    setCoinList(coinListArr);
    if (featuredAsset) {
      setFeaturedAsset(featuredAsset);
    }

    let url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=";

    for (let i = 0; i < props.account.assetData.length; i++) {
      url += props.account.assetData[i].id + "%2C";
    }
    url +=
      "&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d";

    axios
      .get(url)
      .then((response) => {
        setUserData(buildUserData(response.data, props.account.assetData));
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.account]);

  const clickAssetHandler = (asset) => {
    setFeaturedAsset(userData.userAssets[asset]);
    console.log(userData.userAssets[asset]);
  };

  const toggleAddTradeHandler = () => {
    if (
      conditionalDisplayContent === "chart" ||
      conditionalDisplayContent === "view"
    ) {
      setConditionalDisplayContent("add");
    } else setConditionalDisplayContent("chart");
  };

  const toggleViewTradesHandler = () => {
    if (
      conditionalDisplayContent === "chart" ||
      conditionalDisplayContent === "add"
    ) {
      setConditionalDisplayContent("view");
    } else setConditionalDisplayContent("chart");
  };

  const addTradeHandler = (trade) => {
    props.onAddTrade(trade);
  };

  let arrow = "→";
  if (width < 920) {
    arrow = "↓";
  } else arrow = "→";

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.overview}>
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
            `Select a Coin  ${arrow}`
          )}
        </div>
        <div className={classes.conditional}>
          <ConditionalDisplay
            display={conditionalDisplayContent}
            featuredAsset={featuredAsset}
            colors={displayColors}
            data={userData}
            onAddTrade={addTradeHandler}
            coinList={coinList}
            onCloseWindow={toggleAddTradeHandler}
          />
        </div>
        <div className={classes.button1}>
          <AddTradeButton
            onAddTrade={toggleAddTradeHandler}
            display={conditionalDisplayContent}
          />
        </div>
        <div className={classes.button2}>
          <ViewTradesButton
            onViewTrades={toggleViewTradesHandler}
            display={conditionalDisplayContent}
          />
        </div>
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
