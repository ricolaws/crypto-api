import React from "react";
import classes from "./CoinInfo.module.css";

function CoinInfo(props) {
	const {
		image,
		name,
		symbol,
		price,
		marketCap,
		priceChange24,
		priceChange7d,
		roi,
		ath,
		volume,
	} = props;
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
		<div className={classes.rows}>
			<div className={classes.name}>
				<img src={image} alt="crypto" />
				<span>{name}</span>
			</div>
			<p className={classes.symbol}>{symbol.toUpperCase()}</p>

			<p className={classes.price}>
				$
				{price.toLocaleString(undefined, {
					minimumFractionDigits: 0,
					maximumFractionDigits: 3,
				})}
			</p>
			{priceChange24 < 0 ? (
				<p className="red">{priceChange24.toFixed(2)}%</p>
			) : (
				<p className="green">{priceChange24.toFixed(2)}%</p>
			)}
			{priceChange7d < 0 ? (
				<p className="red">{priceChange7d.toFixed(2)}%</p>
			) : (
				<p className="green">{priceChange7d.toFixed(2)}%</p>
			)}
			<p className={classes.marketCap}>${numFormat(marketCap)}</p>
			{roi < 0 ? (
				<p className="red">{roi.toFixed(2)}%</p>
			) : (
				<p className="green">{roi.toFixed(2)}%</p>
			)}
		</div>
	);
}

export default CoinInfo;
