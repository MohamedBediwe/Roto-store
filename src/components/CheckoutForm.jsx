import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";
import { client } from "../ApolloClient";
import { gql } from "@apollo/client";

const CREATE_ORDER_MUTATION = gql`
	mutation CreateOrder(
		$name: String!
		$address: String!
		$orderTotal: String!
		$numItemsInCart: Int!
		$chargeTotal: Float!
		$cartItems: [OrderedProductInput]
	) {
		createOrder(
			name: $name
			address: $address
			cartItems: $cartItems
			orderTotal: $orderTotal
			numItemsInCart: $numItemsInCart
			chargeTotal: $chargeTotal
		) {
			order_id
			user_id
			status
		}
	}
`;

export const action =
	(store, queryClient) =>
	async ({ request }) => {
		const formData = await request.formData();
		const { name, address } = Object.fromEntries(formData);
		const user = store.getState().userState.user;
		const { cartItems, orderTotal, numItemsInCart } =
			store.getState().cartState;

		const info = {
			name,
			address,
			chargeTotal: orderTotal,
			orderTotal: formatPrice(orderTotal),
			cartItems,
			numItemsInCart,
		};

		try {
			const { data } = await client.mutate({
				mutation: CREATE_ORDER_MUTATION,
				variables: info,
				context: {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				},
			});

			queryClient.removeQueries(["orders"]);
			store.dispatch(clearCart());
			toast.success("order placed successfully");
			return redirect("/orders");
		} catch (error) {
			console.log(error);

			const graphQLErrors = error.graphQLErrors;
			console.log(graphQLErrors);
			let errorMessage = "there was an error placing your order";
			if (graphQLErrors && graphQLErrors.length > 0) {
				// Check if there's a specific error message in extensions
				errorMessage =
					graphQLErrors[0]?.extensions?.debugMessage || errorMessage;
			}
			toast.error(errorMessage);
			// if (error?.response?.status === 401 || 403) return redirect("/login");
			return null;
		}
	};

const CheckoutForm = () => {
	return (
		<Form method="POST" className="flex flex-col gap-y-4">
			<h4 className="font-medium text-xl capitalize">shipping information</h4>
			<FormInput label="first name" name="name" type="text" />
			<FormInput label="address" name="address" type="text" />
			<div className="mt-4">
				<SubmitBtn text="place your order" />
			</div>
		</Form>
	);
};
export default CheckoutForm;
