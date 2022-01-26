import React, { useRef } from "react";
import classes from "../pages/Welcome.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/index';


function SignInForm(props) {
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch();
  const nameInputRef = useRef();
  const passwordInputRef = useRef();

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   const enteredName = nameInputRef.current.value;
  //   const enteredPassword = passwordInputRef.current.value;
  //   props.onSignIn(enteredName, enteredPassword);
  // };


  const submitHandler = (e) => {
    e.preventDefault()
    const enteredName = nameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    console.log(enteredName, enteredPassword)
    dispatch(authActions.logIn())
  }

  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={submitHandler}>
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
          placeholder="You can skip it for now :)"
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
