import React from "react";

function ValueAndCost(props) {
  // console.log(props.data);

  return (
    <div>
      <h3>Total Value: ${props.value}</h3>
      <h3>Total Cost: ${props.cost.toFixed(0).toLocaleString()}</h3>
    </div>
  );
}

export default ValueAndCost;
