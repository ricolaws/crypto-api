import React from "react";
import classes from "./Labels.module.css";

export function Labels({}) {
	return (
		<div className={`${classes.rows} ${classes.labels}`}>
			<div className={classes.nameHeading}></div>
			<div className={classes.symbol}>Symbol</div>
			<div>Price</div>
			<div>24hr.</div>
			<div>7d.</div>
			<div>M.Cap</div>
			<div>ROI</div>
		</div>
	);
}
