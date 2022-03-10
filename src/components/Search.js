import React from "react";
import classes from "./Search.module.css";
import Input from "./Input";
function Search(props) {
	return (
		<div className={classes.search}>
			<form>
				<Input type="text" placeholder="Search" onChange={props.onSearch} />
			</form>
		</div>
	);
}

export default Search;

{
	/* <input
          type="text"
          placeholder="Search"
          className={classes.input}
          onChange={props.onSearch}
        ></input> */
}
