import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { gql } from "@apollo/client";
import { client } from "../ApolloClient";
import {
	OrdersList,
	ComplexPaginationContainer,
	SectionTitle,
} from "../components";

const GET_ORDERS = gql`
	query GetOrders($page: Int, $limit: Int) {
		orders(page: $page, limit: $limit) {
			orders {
				name
				address
				created_at
				user_id
				order_id
				total
				status
				numItemsInCart
				ordered_products {
					productID
					amount
					company
					image
					price
					productColor
					title
				}
			}
			meta {
				pagination {
					page
					pageSize
					pageCount
					total
				}
			}
		}
	}
`;

export const Loader =
	(store, queryClient) =>
	async ({ request }) => {
		const user = store.getState().userState.user;

		if (!user) {
			toast.warn("You must logged in to view orders");
			return redirect("/login");
		}
		const params = Object.fromEntries([
			...new URL(request.url).searchParams.entries(),
		]);
		try {
			const { data } = await client.query({
				query: GET_ORDERS,
				variables: {
					page: parseInt(params.page),
				},
				context: {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				},
			});
			console.log(data);

			return { orders: data.orders.orders, meta: data.orders.meta };
		} catch (error) {
			console.log(error);
			const errorMessage =
				error?.response?.data?.error?.message ||
				"there was an error placing your order";
			toast.error(errorMessage);
			// if (error?.response?.status === 401 || 403) return redirect("/login");
			return null;
		}
	};

const Orders = () => {
	const { meta } = useLoaderData();
	if (meta.pagination.total < 1) {
		return <SectionTitle text="please make an order" />;
	}
	return (
		<>
			<SectionTitle text="Your Orders" />
			<OrdersList />
			<ComplexPaginationContainer />
		</>
	);
};
export default Orders;
