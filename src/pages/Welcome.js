import React from "react";
import classes from "./Welcome.module.css";
// import safeVector from "../image/Safe_Vector.svg";
import SignInForm from "../components/SignInForm";

function Welcome(props) {
  return (
    <div className={classes.container}>
      <div className={`${classes.window} ${classes.column}`}>
        <SignInForm onSignIn={props.onSignIn} />
      </div>
    </div>
  );
}

export default Welcome;
