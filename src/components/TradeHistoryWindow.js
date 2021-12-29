import React from "react";

function TradeHistoryWindow(props) {
  const content = props.data.userAssets.map((coin) => {
    return (
      <div>{`${coin.name}: ${coin.movements.map(
        (mov) => mov.date + "" + mov.amount
      )}`}</div>
    );
  });
  return (
    <div>
      <h2>Trade History</h2>
      <p>{content}</p>
    </div>
  );
}

export default TradeHistoryWindow;
