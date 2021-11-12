// import axios from "axios";

export const ACCOUNT_1 = {
  id: 1,
  userName: "Elvad Mc",
  assets: ["solana", "dogecoin", "matic-network"],
  portfolioValue: 0,
  portfolioCost: 0,
  assetData: [
    {
      id: "solana",
      averageCost: 2,
      total: 200,
      movements: [
        { date: "10/27/2020", amount: 60, price: 1.4901 },
        { date: "11 Sept 2021", amount: 60, price: 180.88 },
      ],
    },
    {
      id: "dogecoin",
      total: 100,
      movements: [{ date: "10/27/2020", amount: 10000, price: 0.2595 }],
    },
    {
      id: "matic-network",
      total: 100,
      movements: [
        { date: "10/27/2020", amount: 500, price: 0.01509 },
        { date: "10/27/2021", amount: 500, price: 1.9509 },
      ],
    },
    {
      id: "bitcoin",
      averageCost: 2,
      total: 4,
      movements: [
        { date: "10/27/2020", amount: 0.1, price: 33901.0 },
        { date: "11 Sept 2021", amount: 0.1, price: 47500.88 },
      ],
    },
  ],

  pin: 5555,
  // const calcAssetTotals2 = (arr) => {
  //   return arr.map(
  //     (coin) =>
  //       (coin.totalCost = coin.movements
  //         .map((mov) => mov.amount * mov.price)
  //         .reduce((a, b) => a + b))
  //   );
  // };
  calcTotalCost: function () {
    return this.assetData
      .map((coin) =>
        coin.movements
          .map((mov) => mov.amount * mov.price)
          .reduce((a, b) => a + b)
      )
      .reduce((a, b) => a + b);
  },
};

ACCOUNT_1.portfolioCost = ACCOUNT_1.calcTotalCost();

// const calcAssetCosts = (arr) => {
//   return arr.map(
//     (coin) =>
//       coin.movements.map((mov) => mov.price).reduce((a, b) => a + b) /
//       coin.movements.length
//   );
// };

// const TEST = calcAssetCosts(ACCOUNT_1.assetData);

// console.log("TEST:", TEST);
// for (const [i, val] of TEST) {
//   console.log(i, val);
// }

export const buildUserAssets = (apiData, userData) => {
  const coinDataArray = [];

  const calcAssetTotals = (arr) => {
    arr.map(
      (coin) =>
        (coin.total = coin.movements
          .map((mov) => mov.amount)
          .reduce((a, b) => a + b))
    );
  };

  const calcAverageCosts = (account) => {
    account.map((obj) => {
      const priceArray = [];
      obj.movements.map((mov) => {
        priceArray.push(mov.price);
      });
      obj.averageCost =
        priceArray.reduce((a, b) => a + b, 0) / priceArray.length;
    });
  };

  // calcAssetTotals(userData);
  calcAssetTotals(userData);
  calcAverageCosts(userData);

  apiData.map((coin) => {
    let [matchedData] = userData.filter((data) => data.id === coin.id);
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
  // console.log("ACCOUNT_1", ACCOUNT_1);
  return coinDataArray;
};

export const buildUserData = (account) => {};
