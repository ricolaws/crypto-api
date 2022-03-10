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
				return (
					<div className={classes.rowContainer}>
						<div className={classes.rows}>
							<CoinInfo
								key={coin.id}
								dash={dashDisplayMode}
								name={coin.name}
								price={coin.currentPrice}
								image={coin.image}
								symbol={coin.symbol}
								marketCap={coin.marketCap}
								priceChange24={coin.priceChange_24h}
								priceChange7d={coin.priceChange_7d}
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
