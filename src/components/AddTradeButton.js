import React from "react";
import classes from "./AddTradeButton.module.css";

function AddTrade(props) {
  const clickHandler = () => {
    props.onAddTrade();
  };

  let label = null;
  if (props.display === "add") {
    label = "View Chart";
  } else {
    label = "Add Trade";
  }

  return (
    <div className={classes.container}>
      <button className={classes.addButton} onClick={clickHandler}>
        {label}
      </button>
    </div>
  );
}

export default AddTrade;
