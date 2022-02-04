export const getMarketData = (account) => {
	let url =
		"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=";

	for (let i = 0; i < account.coinData.length; i++) {
		url += account.coinData[i].id + "%2C";
	}
	url +=
		"&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d";

	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			let marketData = data;
			console.log(marketData);
			return marketData;
		})
		.catch(function (error) {
			console.log(error);
		});
};

// const coinListArr = account.coinData.map((coin) => coin.id);
// setCoinList(coinListArr);
// if (featuredAsset) {
//   setFeaturedAsset(featuredAsset);
// }

// let url =
//   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=";

// for (let i = 0; i < account.coinData.length; i++) {
//   url += account.coinData[i].id + "%2C";
// }
// url +=
//   "&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d";

// axios
//   .get(url)
//   .then((response) => {
//     setUserData(buildUserData(response.data, account.coinData));
//   })
//   .catch((error) => console.log(error));

// useEffect(() => {
//     console.log(account);
//     if (account.coinData.length === 0) return;

//     console.log(account);
//     const coinListArr = account.coinData.map((coin) => coin.id);
//     setCoinList(coinListArr);
//     if (featuredAsset) {
//       setFeaturedAsset(featuredAsset);
//     }

//     let url =
//       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=";

//     for (let i = 0; i < account.coinData.length; i++) {
//       url += account.coinData[i].id + "%2C";
//     }
//     url +=
//       "&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d";

//     axios
//       .get(url)
//       .then((response) => {
//         setUserData(buildUserData(response.data, account.coinData));
//       })
//       .catch((error) => console.log(error));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [account]);
