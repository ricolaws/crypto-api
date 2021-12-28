import React, { useState } from "react";
import Card from "./Card";
import classes from "./AddTradeWindow.module.css";

const initialFormData = Object.freeze({
  type: "",
  coin: "",
  date: "",
  amount: "",
  price: "",
  total: "",
});

function AddTradeWindow(props) {
  const [formData, setFormData] = useState(initialFormData);

  const closeWindowHandler = (e) => {
    e.preventDefault();
    props.onCloseWindow();
  };

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onAddTrade(formData);
  };

  const coinMenu = (
    <select required>
      {props.coinList.forEach((coin, i) => {
        <option value={i}>{coin}</option>;
      })}
    </select>
  );

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
                  onChange={changeHandler}
                  type="radio"
                  value="buy"
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
                  onChange={changeHandler}
                  type="radio"
                  value="sell"
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
              <select name="coin" onChange={changeHandler} required>
                <option value="" disabled selected>
                  please choose...
                </option>
                {props.coinList.map((coin, i) => {
                  return (
                    <option key={i} value={coin}>
                      {coin}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={classes.item}>
              <p>Date of trade</p>
              <input
                type="date"
                name="date"
                onChange={changeHandler}
                required
              />
              <i className={classes.calendar}></i>
            </div>
            <div className={classes.item}>
              <p>Amount</p>
              <input
                onChange={changeHandler}
                type="number"
                min="0.01"
                step="0.01"
                max="99999"
                name="amount"
                required
              />
            </div>
            <div className={classes.item}>
              <p>Price</p>
              <input
                onChange={changeHandler}
                type="number"
                min="0.01"
                step="0.01"
                max="99999"
                name="price"
                required
              />
            </div>
            <div className={classes.item}>
              <p>Total</p>
              <input
                onChange={changeHandler}
                type="number"
                min="0.01"
                step="0.01"
                max="99999"
                name="total"
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
