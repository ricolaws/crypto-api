import React from "react";

function Trade(props) {
	const content = (
		<div>
			<h3>{props.data.asset}</h3>
			{props.data.trades.map((trade, i) => {
				return <p key={i}>{trade}</p>;
			})}
		</div>
	);
	return <div>{content}</div>;
}

export default Trade;
