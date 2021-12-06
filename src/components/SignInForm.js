import React, { useRef } from "react";
import classes from "../pages/Welcome.module.css";

function SignInForm(props) {
  const nameInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    props.onSignIn(enteredName, enteredPassword);
  };

  return (
    <React.Fragment>
      <form className={classes.column} onSubmit={submitHandler}>
        <input
          className={classes.input}
          type="text"
          placeholder="Username"
          id="name"
          ref={nameInputRef}
        ></input>
        <input
          className={classes.input}
          type="text"
          placeholder="Password"
          id="password"
          ref={passwordInputRef}
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
