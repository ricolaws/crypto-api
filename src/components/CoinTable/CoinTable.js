import React from "react";
import classes from "./CoinTable.module.css";
import { useSelector } from "react-redux";
import { Labels } from "components/Labels/Labels";
import CoinInfo from "components/CoinInfo";

function CoinTable() {
	const account = useSelector((state) => state.account);

	return (
		<div className={classes.tableContainer}>
			<div className={classes.rowContainer}>
				<Labels />
			</div>
			{account.coinData.map((coin) => {
				return (
					<div className={classes.rowContainer}>
						<CoinInfo
							key={coin.id}
							name={coin.name}
							price={coin.currentPrice}
							image={coin.image}
							symbol={coin.symbol}
							marketCap={coin.marketCap}
							priceChange24={coin.priceChange_24h}
							priceChange7d={coin.priceChange_7d}
							roi={coin.roi}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default CoinTable;
