import React from "react";
import classes from "./Labels.module.css";

export function Labels(props) {
	const { dash } = props;

	return (
		<>
			<div></div>
			<div></div>
			<div>Price</div>
			<div>24 hr.</div>
			<div>7 day.</div>
			<div>A.T.H.</div>
			<div>M.Cap</div>
			<div>{dash ? "ROI" : "Volume"}</div>
		</>
	);
}
