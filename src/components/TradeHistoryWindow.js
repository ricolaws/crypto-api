import React from "react";
import Trade from "./Trade";

function TradeHistoryWindow(props) {
  const content = props.data.userAssets.map((coin) => {
    return {
      asset: coin.name,
      trades: coin.movements.map(
        (mov) => `${mov.date.toDateString()}:  ${mov.amount}`
      ),
    };
  });

  return (
    <div>
      <h2>Trade History</h2>
      {content.map((mov) => {
        return <Trade data={mov} />;
      })}
    </div>
  );
}

export default TradeHistoryWindow;
