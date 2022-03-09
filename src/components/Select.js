import React from "react";
import classes from "./Select.module.css";

export function Select(props) {
	const { value, name, onChange, placeholder, data } = props;

	return (
		<select
			className={classes.select}
			value={value}
			name={name}
			onChange={onChange}
			required
		>
			<option value={placeholder} disabled>
				{placeholder}
			</option>
			{data.map((coin, i) => {
				return (
					<option key={i} value={coin.id}>
						{coin.name}
					</option>
				);
			})}
		</select>
	);
}

export default Select;
