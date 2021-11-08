import axios from "axios";

export const ACCOUNT_1 = {
  id: 1,
  userName: "Elvad Mc",
  assets: ["solana", "dogecoin", "matic-network"],
  assetData: [
    {
      id: "solana",
      averageCost: 2,
      total: 200,
      movements: [
        { date: "10/27/2020", amount: 100, price: 1.4901 },
        { date: "11 Sept 2021", amount: 100, price: 180.88 },
      ],
    },
    {
      id: "dogecoin",
      total: 100,
      movements: [{ date: "10/27/2020", amount: 100, price: 0.2595 }],
    },
    {
      id: "matic-network",
      total: 100,
      movements: [
        { date: "10/27/2020", amount: 100, price: 0.01509 },
        { date: "10/27/2021", amount: 100, price: 1.9509 },
      ],
    },
  ],
  pin: 5555,
};

// export const getCurrentData = (account) => {

//   axios
//     .get(
//       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=solana%2Cdogecoin%2Cmatic-network&order=market_cap_desc&per_page=100&page=1&sparkline=false"
//     )
//     .then((response) => {
//       // console.log(response.data);
//       setUserAssets(buildUserData(response.data, ACCOUNT_1));
//     })
//     .catch((error) => console.log(error));
// };

export const buildUserData = (apiData, userData) => {
  const coinDataArray = [];
  const calcAssetTotals = (account) => {
    account.assetData.map((obj) => {
      const amountsArray = [];
      obj.movements.map((mov) => {
        amountsArray.push(mov.amount);
      });
      obj.total = amountsArray.reduce((a, mov) => a + mov, 0);
    });
  };

  const calcAverageCosts = (account) => {
    account.assetData.map((obj) => {
      const priceArray = [];
      obj.movements.map((mov) => {
        priceArray.push(mov.price);
      });
      obj.averageCost =
        priceArray.reduce((a, b) => a + b, 0) / priceArray.length;
    });
  };

  calcAssetTotals(userData);
  calcAverageCosts(userData);
  apiData.map((coin) => {
    let [matchedData] = userData.assetData.filter(
      (data) => data.id === coin.id
    );
    let coinDataObj = {
      id: coin.id,
      name: coin.name,
      current_price: coin.current_price,
      image: coin.image,
      symbol: coin.symbol,
      market_cap: coin.market_cap,
      total_units: matchedData.total,
      average_cost: matchedData.averageCost,
      current_value: coin.current_price * matchedData.total,
      total_cost: matchedData.averageCost * matchedData.total,
      price_change_24h: coin.price_change_percentage_24h,
      price_change_7d: coin.price_change_percentage_7d_in_currency,
      ath: coin.ath,
      total_volume: coin.total_volume,
    };
    coinDataObj.roi =
      (coinDataObj.current_value / coinDataObj.total_cost) * 100;
    coinDataArray.push(coinDataObj);
  });
  console.log(coinDataArray);
  return coinDataArray;
};
