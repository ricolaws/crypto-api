import React from "react";
import Card from "./Card";
import classes from "./AddTradeWindow.module.css";

function AddTradeWindow(props) {
  const closeWindowHandler = (e) => {
    e.preventDefault();
    console.log("close");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  const coinMenu = [];

  return (
    <Card>
      <div className={classes.container}>
        <form onSubmit={submitHandler}>
          <div className={classes.banner}>
            <h2>Buying or selling crypto?</h2>
            <h3>
              Fill out the form to record a transaction. <br />
              We will update your portfolio!
            </h3>
          </div>
          <div className={classes.main}>
            <div className={classes.item}>
              <div>
                <input
                  type="radio"
                  value="none"
                  id="radio_1"
                  name="type"
                  required
                />
                <label for="radio_1" className={classes.radio}>
                  <span>Buy</span>
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  value="none"
                  id="radio_2"
                  name="type"
                  required
                />
                <label for="radio_2" className={classes.radio}>
                  <span>Sell</span>
                </label>
              </div>
            </div>
            <div className={classes.item}>
              <p>Which Coin?</p>
              <select required>
                <option value="1">Coin 1</option>
                <option value="2">Coin 2</option>
                <option value="3">Coin 3</option>
                <option value="4">Coin 4</option>
                <option value="5">Coin 5</option>
              </select>
            </div>
            <div className={classes.item}>
              <p>Date of trade</p>
              <input type="date" name="date" required />
              <i className={classes.calendar}></i>
            </div>
            <div className={classes.item}>
              <p>Amount</p>

              <input
                type="number"
                min="0.01"
                step="0.01"
                max="99999"
                required
              />
            </div>
            <div className={classes.item}>
              <p>Price</p>
              <input
                type="number"
                min="0.01"
                step="0.01"
                max="99999"
                required
              />
            </div>
            <div className={classes.item}>
              <p>Total</p>
              <input
                type="number"
                min="0.01"
                step="0.01"
                max="99999"
                required
              />
            </div>
          </div>
          <div className={classes.actions}>
            <button type="submit">Submit</button>
            <button type="button" onClick={closeWindowHandler}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default AddTradeWindow;
