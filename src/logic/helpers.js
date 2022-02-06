// helper functions

// Currency formatter.
export const money = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});
