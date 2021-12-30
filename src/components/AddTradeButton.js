import React from "react";


function AddTrade(props) {
  const clickHandler = () => {
    props.onAddTrade();
  };

  let label = null;
  if (props.display === "add") {
    label = "View Chart";
  } else {
    label = "Add Trade";
  }

  return (
    <div>
      <button onClick={clickHandler}>
        {label}
      </button>
    </div>
  );
}

export default AddTrade;
