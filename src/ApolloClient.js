import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	uri: "http://mohamed-bediwe.onlinewebshop.net/",
	cache: new InMemoryCache(),
});
