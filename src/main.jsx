import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { store } from "./store.js";
import { Provider } from "react-redux";
import {
	ApolloProvider,
	// gql,
} from "@apollo/client";
import { client } from "./ApolloClient";

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
		<ToastContainer position="top-center" />
	</Provider>
);
