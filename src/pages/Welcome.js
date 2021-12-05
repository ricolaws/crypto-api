import React from "react";
import classes from "./Welcome.module.css";
import safeVector from "../image/Safe_Vector.svg";
import SignInForm from "../components/SignInForm";

function Welcome() {
  return (
    <div className={classes.container}>
      <div className={`${classes.window} ${classes.column}`}>
        <SignInForm />
      </div>
    </div>
  );
}

export default Welcome;
