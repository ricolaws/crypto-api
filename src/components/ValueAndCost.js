import React from "react";
import { money } from "../logic/helpers";
import classes from "../pages/Dashboard.module.css";

function ValueAndCost(props) {
	const { title, value, cost, roi } = props;

	return (
		<div className={classes.valCostContainer}>
			<h2>{title}</h2>
			<div className={classes.totalsWords}>
				<p>Value:</p>
				<p>Cost:</p>
			</div>
			<div className={classes.totalsNums}>
				<p>{money.format(value)}</p>
				<p>{money.format(cost)}</p>
			</div>
			<div className={classes.totalReturnPercentage}>
				{roi < 100 ? (
					<p className="red">{roi.toFixed(2)}%</p>
				) : (
					<p className="green">{roi.toFixed(2)}%</p>
				)}
			</div>
		</div>
	);
}

export default ValueAndCost;
