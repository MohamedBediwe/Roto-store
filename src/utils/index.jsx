// const productionUrl = "https://strapi-store-server.onrender.com/api";

export const formatPrice = (price) => {
	const dollarsAmount = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price);
	return dollarsAmount;
};

export const generateAmountOptions = (number) => {
	return Array.from({ length: number }, (_, index) => {
		const amount = index + 1;

		return (
			<option key={amount} value={amount}>
				{amount}
			</option>
		);
	});
};
