import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { gql } from "@apollo/client";
import { client } from "../ApolloClient";

const GET_PRODUCTS = gql`
	query GetProducts(
		$page: Int
		$category: String
		$company: String
		$price: Float
		$search: String
		$order: String
		$shipping: Boolean
	) {
		products(
			page: $page
			category: $category
			company: $company
			price: $price
			search: $search
			order: $order
			shipping: $shipping
		) {
			products {
				title
				price
				id
				image
				company
			}
			meta {
				pagination {
					page
					pageSize
					pageCount
					total
				}
				categories
				companies
			}
		}
	}
`;

export const Loader = async ({ request }) => {
	const params = Object.fromEntries([
		...new URL(request.url).searchParams.entries(),
	]);

	const variables = {
		page: params.page ? parseInt(params.page) : 1,
		category: params.category,
		company: params.company,
		price: params.price ? parseFloat(params.price) : undefined,
		search: params.search,
		order: params.order,
		limit: 10,
		shipping: Boolean(params.shipping),
	};

	try {
		const {
			data: {
				products: { products, meta },
			},
		} = await client.query({
			query: GET_PRODUCTS,
			variables,
		});

		return { products: products, meta: meta, params };
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};

function Products() {
	return (
		<>
			<Filters />
			<ProductsContainer />
			<PaginationContainer />
		</>
	);
}

export default Products;
