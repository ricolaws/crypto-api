import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";

function MainHeader(props) {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/welcome">
              Welcome
            </NavLink>
          </li>
          {props.signedIn ? (
            <li>
              <NavLink activeClassName={classes.active} to="/dashboard">
                Dashboard
              </NavLink>
            </li>
          ) : null}
          {props.signedIn ? (
            <li>
              <NavLink activeClassName={classes.active} to="/browse">
                Browse
              </NavLink>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
