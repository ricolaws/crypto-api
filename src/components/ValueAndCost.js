import React, { useState, useEffect } from "react";
import classes from "../pages/Dashboard.module.css";

function ValueAndCost(props) {
  const [totalValue, setTotalValue] = useState();
  const [ROI, setROI] = useState();

  useEffect(() => {
    if (props.value) {
      setTotalValue(props.value.toLocaleString());
      setROI((props.value / props.cost) * 100 - 100);
    }
  }, [props.value]);

  const returnOnInvestment = ROI ? ROI.toFixed(2) : null;

  const title = props.title;

  return (
    <div className={classes.valCostContainer}>
      <h2>{title}</h2>
      <div className={classes.totalsWords}>
        <p>Value:</p>
        <p>Cost:</p>
      </div>
      <div className={classes.totalsNums}>
        <p>${totalValue}</p>
        <p>
          $
          {props.cost.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
      <div className={classes.totalReturnPercentage}>
        {returnOnInvestment < 0 ? (
          <p className="red">{returnOnInvestment}%</p>
        ) : (
          <p className="green">{returnOnInvestment}%</p>
        )}
      </div>
    </div>
  );
}

export default ValueAndCost;
