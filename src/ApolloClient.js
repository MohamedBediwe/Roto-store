import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	uri: "htts://roto-store.ct.ws/",
	cache: new InMemoryCache(),
});
