import React from "react";
import classes from "./CoinTable.module.css";

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

function CoinTable(props) {
	// const {
	// 	image,
	// 	name,
	// 	symbol,
	// 	price,
	// 	marketCap,
	// 	priceChange24,
	// 	priceChange7d,
	// 	roi,
	// } = props;

	return (
		<table>
			{props.data.map((coin) => {
				return (
					<tr>
						<th>{coin.image}</th>
						<th>{coin.name}</th>
						<th>{coin.symbol}</th>
						<th>{coin.currentPrice}</th>
						<th>{coin.priceChange_24h}</th>
						<th>{coin.priceChange_7d}</th>
						<th>{coin.marketCap}</th>
						<th>{coin.roi}</th>
					</tr>
				);
			})}
			<tr>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Email Address</th>
			</tr>
			<tr>
				<td>Hillary</td>
				<td>Nyakundi</td>
				<td>tables@mail.com</td>
			</tr>
			<tr>
				<td>Lary</td>
				<td>Mak</td>
				<td>developer@mail.com</td>
			</tr>
		</table>
	);
}

export default CoinTable;
