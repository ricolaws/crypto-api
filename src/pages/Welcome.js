import React from "react";
import classes from "./Welcome.module.css";
import SignInForm from "../components/SignInForm";
import { useSelector } from 'react-redux';

function Welcome() {
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  return (
    <div className={classes.container}>
      <div className={`${classes.window} ${classes.column}`}>
        {!isLoggedIn && <SignInForm />}
      </div>
    </div>
  );
}

export default Welcome;
