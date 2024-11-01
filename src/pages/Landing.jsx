import { gql } from "@apollo/client";
import { FeaturedProducts, Hero } from "../components";
import { client } from "../ApolloClient";

export const Loader = async () => {
	try {
		const { data } = await client.query({
			query: gql`
				{
					featuredProducts {
						title
						price
						image
						id
					}
				}
			`,
		});
		return { products: data.featuredProducts };
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};
function Landing() {
	return (
		<>
			<Hero />
			<FeaturedProducts />
		</>
	);
}

export default Landing;
