// helper functions

// Currency formatter.
export const money = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

// convert timestamp to date
export const getDateFromStamp = (timeStamp) => {
	var d = new Date(timeStamp);
	const TSConverted = d.getMonth() + 1 + "/" + d.getDate();
	return TSConverted;
};

// format numbers
export const numFormat = (num) => {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
	}
	if (num >= 100) {
		return num.toFixed(0);
	}
	if (num <= 1) {
		return num.toFixed(3);
	}
	return num.toFixed(2);
};

// loop over nested array adding all values at each index of the sub arrays
export const addNestedArrays = (arr) => {
	let sums = arr.reduce(
		(prev, current) => current.map((el, i) => (prev[i] || 0) + el),
		[]
	);
	return sums;
};

export const contrastColor = (hex) => {
	if (hex.indexOf("#") === 0) {
		hex = hex.slice(1);
	}
	// convert 3-digit hex to 6-digits.
	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	if (hex.length !== 6) {
		throw new Error("Invalid HEX color.");
	}
	const r = parseInt(hex.slice(0, 2), 16);
	const g = parseInt(hex.slice(2, 4), 16);
	const b = parseInt(hex.slice(4, 6), 16);

	return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#161515" : "#f4f4f0";
};
