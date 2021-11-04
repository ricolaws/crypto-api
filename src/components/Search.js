import React from "react";
import classes from "./Search.module.css";

function Search(props) {
  return (
    <div className={classes.search}>
      <form>
        <input
          type="text"
          placeholder="Search"
          className={classes.input}
          onChange={props.onSearch}
        ></input>
      </form>
    </div>
  );
}

export default Search;
