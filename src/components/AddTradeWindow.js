import React, { useState } from "react";
import classes from "./AddTradeWindow.module.css";
import { useSelector } from "react-redux";

const initialFormData = Object.freeze({
	type: "",
	id: "please choose...",
	date: "",
	amount: 0,
	price: 0,
	total: 0,
});

function AddTradeWindow(props) {
	const coinData = useSelector((state) => state.account.coinData);
	const [formData, setFormData] = useState(initialFormData);

	// const closeWindowHandler = (e) => {
	//   e.preventDefault();
	//   props.onCloseWindow();
	// };

	console.log(props.onAddTrade);
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

	const submitHandler = (e) => {
		e.preventDefault();

		if (formData.type === "sell") {
			formData.amount = formData.amount * -1;
			console.log(formData);
		}
		props.onAddTrade(formData);
		setFormData(initialFormData);
	};

	return (
		<div className={classes.container}>
			<form className={classes.form} onSubmit={submitHandler}>
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
						<select
							value={formData.id || "please choose..."}
							name="id"
							onChange={changeHandler}
							required
						>
							<option value="please choose..." disabled>
								please choose...
							</option>
							{coinData.map((coin, i) => {
								return (
									<option key={i} value={coin.id}>
										{coin.name}
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
							value={formData.date}
							required
						/>
						<i className={classes.calendar}></i>
					</div>
					<div className={classes.item}>
						<p>Amount</p>
						<input
							onChange={changeHandler}
							value={formData.amount}
							type="number"
							name="amount"
							min="0"
							step="0.001"
							required
						/>
					</div>
					<div className={classes.item}>
						<p>Price</p>
						<input
							onChange={changeHandler}
							value={formData.price}
							type="number"
							min="0"
							step="0.01"
							name="price"
							required
						/>
					</div>
					<div className={classes.item}>
						<p>Total</p>
						<input
							onChange={changeHandler}
							value={formData.total}
							type="number"
							name="total"
							min="0"
							step="0.01"
							required
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
