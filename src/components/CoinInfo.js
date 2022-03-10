import React from "react";
import classes from "./CoinInfo.module.css";
import { numFormat } from "../logic/helpers.js";

function CoinInfo(props) {
	const {
		dash,
		image,
		symbol,
		price,
		marketCap,
		priceChange24,
		priceChange7d,
		roi,
		ath,
		volume,
	} = props;

	return (
		<>
			<div className={classes.name}>
				<img src={image} alt="coin-logo" />
			</div>
			<p className={classes.symbol}>{symbol.toUpperCase()}</p>

			<p className={classes.price}>
				$
				{price.toLocaleString(undefined, {
					minimumFractionDigits: 0,
					maximumFractionDigits: 3,
				})}
			</p>

			<p className={priceChange24 < 0 ? "red" : "green"}>
				{priceChange24.toFixed(2)}%
			</p>

			<p className={priceChange7d < 0 ? "red" : "green"}>
				{priceChange7d.toFixed(2)}%
			</p>

			<p>${numFormat(ath)}</p>

			<p>${numFormat(marketCap)}</p>

			{dash ? (
				<p className={roi < 0 ? "red" : "green"}>{roi.toFixed(2)}%</p>
			) : (
				<p>${numFormat(volume)}</p>
			)}
		</>
	);
}

export default CoinInfo;
