import * as colors from "../theme/colors.module.css";

// DUMMY ACCOUNT DATA
export const ACCOUNT_1 = {
  id: 1,
  userName: "Elvad Mc",
  portfolioValue: 0,
  portfolioCost: 0,
  assetData: [
    {
      id: "solana",
      averageCost: 2,
      total: 120,
      movements: [
        { date: new Date("2021-09-27"), amount: 60, price: 90.9 },
        { date: new Date("2021-06-27"), amount: 70, price: 180.88 },
        { date: new Date("2020-11-07"), amount: 30, price: 206.88 },
      ],
    },
    {
      id: "dogecoin",
      total: 10000,
      movements: [
        { date: new Date("2020-10-27"), amount: 40000, price: 0.2595 },
      ],
    },
    {
      id: "matic-network",
      total: 1000,
      movements: [
        { date: new Date("2021-10-27"), amount: 2500, price: 0.01509 },
        { date: new Date("2020-10-27"), amount: 500, price: 1.9509 },
      ],
    },
    {
      id: "bitcoin",
      total: 0.2,
      movements: [
        { date: new Date("2021-10-27"), amount: 0.3, price: 33901.0 },
        { date: new Date("2020-10-27"), amount: 0.1, price: 47500.88 },
      ],
    },
    {
      id: "ethereum",
      total: 0.9,
      movements: [
        { date: new Date("2021-05-27"), amount: 0.4, price: 3201.0 },
        { date: new Date("2020-11-27"), amount: 1.5, price: 2900.98 },
      ],
    },
  ],
  pin: 5555,
  calcTotalCost: function () {
    return this.assetData
      .map((coin) =>
        coin.movements
          .map((mov) => mov.amount * mov.price)
          .reduce((a, b) => a + b)
      )
      .reduce((a, b) => a + b);
  },
  calcCoinAmountsOverTime: function () {
    return this.assetData.map((coin) =>
      coin.movements.map((mov) => {
        return { date: mov.date, amount: mov.amount };
      })
    );
  },
};

ACCOUNT_1.portfolioCost = ACCOUNT_1.calcTotalCost();

// calculate the total amount of a coin in the portfolio on a daily basis, from the first purchase to the current date
function getDailyTotals(coin) {
  const dailyTotals = [];
  const rightNow = new Date();
  // be sure that the movements are in chronological order
  const movs = coin.movements.sort((a, b) => a.date - b.date);
  const addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  let runningTotal = 0;
  for (let i = 0; i <= movs.length - 1; i++) {
    let currentDate = movs[i].date;
    runningTotal += movs[i].amount;

    if (movs[i + 1]) {
      while (currentDate < movs[i + 1].date) {
        dailyTotals.push({ date: currentDate, amount: runningTotal });
        currentDate = addDays.call(currentDate, 1);
      }
    } else {
      while (currentDate <= rightNow) {
        dailyTotals.push({ date: currentDate, amount: runningTotal });
        currentDate = addDays.call(currentDate, 1);
      }
    }
  }
  coin.dailyTotals = dailyTotals;
}

const calcAssetTotals = (arr) => {
  arr.map(
    (coin) =>
      (coin.total = coin.movements
        .map((mov) => mov.amount)
        .reduce((a, b) => a + b))
  );
};
const calcAverageCosts = (arr) => {
  arr.map(
    (coin) =>
      (coin.averageCost =
        coin.movements.map((mov) => mov.price).reduce((a, b) => a + b) /
        coin.movements.length)
  );
};

export const buildUserData = (apiData, accountData) => {
  calcAssetTotals(accountData);
  calcAverageCosts(accountData);

  const coinDataArray = apiData.map((coin) => {
    let [matchedData] = accountData.filter((data) => data.id === coin.id);
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
      movements: matchedData.movements,
      displayColor: colors.color2,
    };
    coinDataObj.roi =
      (coinDataObj.current_value / coinDataObj.total_cost) * 100;
    return coinDataObj;
  });

  const portfolioVal = coinDataArray
    .map((coin) => {
      return coin.current_value;
    })
    .reduce((a, b) => {
      return a + b;
    });

  const portfolioTotalCost = coinDataArray
    .map((coin) => coin.total_cost)
    .reduce((a, b) => {
      return a + b;
    });

  coinDataArray.forEach((coin) => getDailyTotals(coin));

  return {
    userAssets: coinDataArray,
    portfolioValue: portfolioVal,
    portfolioCost: portfolioTotalCost,
  };
};
