import React from "react";
import classes from "./Input.module.css";

function Input(props) {
	const { label, onChange, type, value, min, name, step } = props;
	return (
		<>
			<label>{label}</label>
			<input
				className={classes.input}
				onChange={onChange}
				type={type}
				value={value}
				min={min}
				step={step}
				name={name}
				required
			/>
		</>
	);
}

export default Input;
