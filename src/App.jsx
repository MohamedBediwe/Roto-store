import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
	HomeLayout,
	Landing,
	Error,
	Products,
	SingleProduct,
	Cart,
	About,
	Register,
	Login,
	Checkout,
	Orders,
} from "./pages";

// loaders
import { Loader as landingLoader } from "./pages/Landing";
import { Loader as SingleProductLoader } from "./pages/SingleProduct";
import { Loader as ProductsLoader } from "./pages/Products";
import { Loader as CheckoutLoader } from "./pages/Checkout";
import { Loader as OrdersLoader } from "./pages/Orders";
// action
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as checkoutAction } from "./components/CheckoutForm";

import { store } from "./store";
import { ErrorELement } from "./components";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
		},
	},
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Landing />,
				errorElement: <ErrorELement />,
				loader: landingLoader,
			},
			{
				path: "products",
				element: <Products />,
				loader: ProductsLoader,
			},
			{
				path: "products/:id",
				element: <SingleProduct />,
				loader: SingleProductLoader,
			},
			{
				path: "cart",
				element: <Cart />,
			},
			{
				path: "about",
				element: <About />,
			},
			{
				path: "checkout",
				element: <Checkout />,
				loader: CheckoutLoader(store),
				action: checkoutAction(store, queryClient),
			},
			{
				path: "orders",
				element: <Orders />,
				loader: OrdersLoader(store, queryClient),
			},
		],
	},
	{
		path: "register",
		element: <Register />,
		errorElement: <Error />,
		action: registerAction,
	},
	{
		path: "login",
		element: <Login />,
		errorElement: <Error />,
		action: loginAction(store),
	},
]);

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
