import React from "react";
import classes from "./AddTradeButton.module.css";

function ViewTradesButton(props) {
  const clickHandler = () => {
    props.onViewTrades();
  };

  let label = null;
  if (props.display === "view") {
    label = "View Chart";
  } else {
    label = "View Trades";
  }

  return (
    <div className={classes.container}>
      <button className={classes.addButton} onClick={clickHandler}>
        {label}
      </button>
    </div>
  );
}

export default ViewTradesButton;
