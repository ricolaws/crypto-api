import React from "react";
import PortfolioLineChart from "./PortfolioLineChart";
import AddTradeWindow from "./AddTradeWindow";
import TradeHistoryWindow from "./TradeHistoryWindow";
import Card from "./Card";

function ConditionalDisplay(props) {
  let content = null;
  if (props.display === "chart") {
    content = (
      <PortfolioLineChart
        colorPatterns={props.colorPatterns}
        featuredAsset={props.featuredAsset}
        colors={props.colors}
        coins={props.coinList}
        amounts={props.data.userAssets}
        data={props.data}
      />
    );
  }
  if (props.display === "add") {
    content = (
      <AddTradeWindow
        onAddTrade={props.onAddTrade}
        coinList={props.coinList}
        onCloseWindow={props.onCloseWindow}
      />
    );
  }
  if (props.display === "view") {
    content = <TradeHistoryWindow data={props.data} />;
  }

  return <Card>{content}</Card>;
}

export default ConditionalDisplay;
