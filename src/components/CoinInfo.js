import React from "react";
import classes from "./CoinInfo.module.css";

function CoinInfo({
  image,
  name,
  symbol,
  price,
  marketCap,
  priceChange,
  volume,
  roi,
}) {
  function numFormat(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  }

  return (
    <div className={classes.container}>
      <div className={classes.rows}>
        <div className={classes.name}>
          <img src={image} alt="crypto" />
          <h4>{name}</h4>
        </div>
        <p className={classes.symbol}>{symbol.toUpperCase()}</p>

        <p className={classes.price}>
          $
          {price.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 3,
          })}
        </p>
        <p className={classes.marketCap}>${numFormat(marketCap)}</p>
        {priceChange < 0 ? (
          <p className={classes.red}>{priceChange.toFixed(2)}%</p>
        ) : (
          <p className={classes.green}>{priceChange.toFixed(2)}%</p>
        )}
        <p className={classes.volume}>${volume.toLocaleString()}</p>
        {roi < 0 ? (
          <p className={classes.red}>{roi.toFixed(2)}%</p>
        ) : (
          <p className={classes.green}>{roi.toFixed(2)}%</p>
        )}
      </div>
    </div>
  );
}

export default CoinInfo;
