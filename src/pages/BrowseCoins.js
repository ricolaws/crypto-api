import React, { useState, useEffect } from "react";
import axios from "axios";
import CoinTable from "components/CoinTable/CoinTable";
import Card from "../components/Card";
import Search from "../components/Search";
import classes from "./BrowseCoins.module.css";

function BrowseCoins() {
	const [coins, setCoins] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		axios
			.get(
				"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h%2C7d"
			)
			.then((response) => {
				setCoins(response.data);
			})
			.catch((error) => console.log(error));
	}, []);

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const filteredCoins = coins.filter((coin) =>
		coin.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<React.Fragment>
			<div className={classes.main}>
				<Card>
					<section className={classes.window}>
						<h2>Search for a Coin 🔍</h2>
						<Search onSearch={handleSearch} />
					</section>
				</Card>
				<CoinTable data={filteredCoins} dashDisplayMode={false} />
			</div>
		</React.Fragment>
	);
}

export default BrowseCoins;
