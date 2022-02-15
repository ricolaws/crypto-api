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

// loop over nested array adding all values at each index of the sub arrays
export const addNestedArrays = (arr) => {
	let sums = arr.reduce(
		(prev, current) => current.map((el, i) => (prev[i] || 0) + el),
		[]
	);
	return sums;
};
