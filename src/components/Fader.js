import React, { useState, useEffect } from "react";
import classes from "./Fader.module.css";

function Fader(props) {
	const [fadeStatus, setFadeStatus] = useState(classes.out);
	const { time } = props;

	useEffect(() => {
		setTimeout(() => {
			setFadeStatus(classes.in);
		}, time);
	}, []);

	return <div className={fadeStatus}>{props.children}</div>;
}

export default Fader;
