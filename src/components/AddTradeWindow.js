import { Select } from "./Select";
import Input from "components/Input.js";
import React, { useState } from "react";
import classes from "./AddTradeWindow.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addTradeThenUpdateDB } from "../store/account-actions";

const initialFormData = {
	type: "",
	id: "please choose...",
	date: "",
	amount: 0,
	price: 0,
	total: 0,
};

function AddTradeWindow(props) {
	const account = useSelector((state) => state.account);
	const dispatch = useDispatch();
	const [formData, setFormData] = useState(initialFormData);

	const changeHandler = (e) => {
		let newFormData = {
			...formData,
			[e.target.name]: e.target.value.trim(),
		};

		if (e.target.name === "amount" && newFormData.price == 0) {
			newFormData.total = e.target.value;
		} else if (e.target.name === "amount") {
			newFormData.total =
				Math.round(Number(e.target.value * newFormData.price) * 100) / 100;
		}
		if (e.target.name === "price") {
			newFormData.total =
				Math.round(Number(e.target.value * newFormData.amount) * 100) / 100;
		}
		if (e.target.name === "total") {
			newFormData.price =
				Math.round(Number(e.target.value / newFormData.amount) * 100) / 100;
		}

		newFormData.amount = Number(newFormData.amount);
		setFormData(newFormData);
	};

	const selectHandler = (e) => {
		setFormData({
			...formData,
			type: e.target.value,
		});
	};

	// this is adding the mov to redux but not updating the current value and total cost of the coin, which is what the chart is displaying.
	// these parts need to be extracted from buildAccount and made a part of this action.
	const addTradeHandler = (e) => {
		e.preventDefault();
		const trade = formData;
		if (formData.type === "sell") {
			trade.amount = trade.amount * -1;
			console.log(trade);
		}
		const newMovement = {
			amount: Number(trade.amount),
			date: trade.date + "T09:00:00.000Z",
			price: Number(trade.price),
		};
		const index = account.coinData.findIndex((coin) => coin.id === trade.id);

		const payload = { newMovement, index };
		dispatch(addTradeThenUpdateDB(payload, account));
		// const newMovement = {
		// 	amount: Number(trade.amount),
		// 	date: trade.date + "T09:00:00.000Z",
		// 	price: Number(trade.price),
		// };
		// const index = account.coinData.findIndex((coin) => coin.id === trade.id);
		// const payload = { newMovement, index };
		// dispatch(accountActions.addTrade(payload));
		// recalc coin totalCost, currentVal, and ROI
		// portfolio totalCost, currentVal, and ROI
		// setFormData(initialFormData);
	};

	return (
		<div className={classes.container}>
			<form className={classes.form} onSubmit={addTradeHandler}>
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
								onChange={selectHandler}
								type="radio"
								value="buy"
								id="radio_1"
								checked={formData.type === "buy"}
								name="type"
								required
							/>
							<label htmlFor="radio_1" className={classes.radio}>
								<span>Buy</span>
							</label>
						</div>
						<div>
							<input
								onChange={selectHandler}
								type="radio"
								value="sell"
								id="radio_2"
								checked={formData.type === "sell"}
								name="type"
								required
							/>
							<label htmlFor="radio_2" className={classes.radio}>
								<span>Sell</span>
							</label>
						</div>
					</div>
					<div className={classes.item}>
						<p>Which Coin?</p>
						<Select
							value={formData.id || "please choose..."}
							name="id"
							onChange={changeHandler}
							placeholder="please choose..."
							data={account.coinData}
						/>
					</div>
					<div className={classes.item}>
						<Input
							label="Date of trade"
							type="date"
							name="date"
							onChange={changeHandler}
							value={formData.date}
							required
						/>
						<i className={classes.calendar}></i>
					</div>
					<div className={classes.item}>
						<Input
							label="Amount"
							onChange={changeHandler}
							value={formData.amount}
							type="number"
							name="amount"
							min="0"
							step="0.001"
						/>
					</div>
					<div className={classes.item}>
						<Input
							label="Price"
							onChange={changeHandler}
							value={formData.price}
							type="number"
							min="0"
							step="0.01"
							name="price"
						/>
					</div>
					<div className={classes.item}>
						<Input
							label="Total"
							onChange={changeHandler}
							value={formData.total}
							type="number"
							name="total"
							min="0"
							step="0.01"
						/>
					</div>
				</div>
				<div className={classes.actions}>
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
}

export default AddTradeWindow;
