import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";
import { useSelector } from 'react-redux';

function MainHeader(props) {
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);

  console.log(isLoggedIn);
  return (
    <header className={classes.header}>
      <nav>
          {!isLoggedIn &&
          <ul>
            <li>
              <NavLink activeClassName={classes.active} to="/welcome">
                Welcome
              </NavLink>
            </li> 
          </ul>
          }
          {isLoggedIn && 
          <ul>
            <li>
              <NavLink activeClassName={classes.active} to="/dashboard">
                Dashboard
              </NavLink>
            </li> 
            <li>
              <NavLink activeClassName={classes.active} to="/browse">
                Browse
              </NavLink>
            </li>
          </ul>
          }
      </nav>
    </header>
  );
}

export default MainHeader;
