import React, { useState } from "react";
import classes from "../pages/Welcome.module.css";

function SignInForm() {
  const [enteredName, setEnteredName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const nameChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const signInData = {
      username: enteredName,
      password: enteredPassword,
    };
    console.log(enteredName, enteredPassword);
    setEnteredName("");
    setEnteredPassword("");
  };
  return (
    <React.Fragment>
      <form className={classes.column} onSubmit={submitHandler}>
        <input
          className={classes.input}
          type="text"
          placeholder="Username"
          value={enteredName}
          onChange={nameChangeHandler}
        ></input>
        <input
          className={classes.input}
          type="text"
          placeholder="Password"
          value={enteredPassword}
          onChange={passwordChangeHandler}
        ></input>
        <div className={classes.row}>
          <button className={classes.button} type="submit">
            Sign In
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default SignInForm;
