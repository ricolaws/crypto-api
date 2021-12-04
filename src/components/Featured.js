import React, { useEffect, useState } from "react";

function Featured(props) {
  console.log(props.priceChange.price_change_24h);
  return (
    <React.Fragment>
      <h4>{props.symbol.toUpperCase()}</h4>
      <p>${props.price.toFixed(4)}</p>
    </React.Fragment>
  );
}

export default Featured;
