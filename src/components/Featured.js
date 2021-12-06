import React, { useEffect, useState } from "react";

function Featured(props) {
  console.log(props.priceChange.price_change_24h);
  return (
    <React.Fragment>
      <h3>{props.symbol.toUpperCase()}</h3>
      <p>${props.price.toFixed(4)}</p>
      <p>${props.ath}</p>
    </React.Fragment>
  );
}

export default Featured;
