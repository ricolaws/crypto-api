import React from "react";
import classes from "./CoinTable.module.css";
import { Labels } from "components/Labels/Labels";
import CoinInfo from "components/CoinInfo";

function CoinTable(props) {
	const { dashDisplayMode, data } = props;

	return (
		<div className={classes.tableContainer}>
			<div className={classes.rowContainer}>
				<div className={`${classes.rows} ${classes.labels}`}>
					<Labels dash={dashDisplayMode} />
				</div>
			</div>
			{data.map((coin) => {
				const price = coin.currentPrice || coin.current_price;
				const marketCap = coin.marketCap || coin.market_cap;
				const priceChange24 =
					coin.priceChange_24h || coin.price_change_percentage_24h;
				const priceChange7d =
					coin.priceChange_7d || coin.price_change_percentage_7d_in_currency;

				return (
					<div key={coin.id} className={classes.rowContainer}>
						<div key={coin.id} className={classes.rows}>
							<CoinInfo
								key={coin.id}
								dash={dashDisplayMode}
								name={coin.name}
								price={price}
								image={coin.image}
								symbol={coin.symbol}
								marketCap={marketCap}
								priceChange24={priceChange24}
								priceChange7d={priceChange7d}
								roi={coin.roi}
								ath={coin.ath}
								volume={coin.total_volume}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default CoinTable;
