import React from "react";
import classes from "./AddTradeButton.module.css";

function ViewTradesButton(props) {
  const clickHandler = () => {
    props.onViewTrades();
  };

  return (
    <div className={classes.container}>
      <button className={classes.addButton} onClick={clickHandler}>
        View Trades
      </button>
    </div>
  );
}

export default ViewTradesButton;
