import React from "react";

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
    <div>
      <button onClick={clickHandler}>{label}</button>
    </div>
  );
}

export default ViewTradesButton;
