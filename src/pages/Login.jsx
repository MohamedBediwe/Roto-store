import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { client } from "../ApolloClient";
import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
	mutation login($identifier: String!, $password: String!) {
		login(identifier: $identifier, password: $password) {
			jwt
			user {
				id
				name
				email
			}
		}
	}
`;

// eslint-disable-next-line react-refresh/only-export-components
export const action =
	(store) =>
	async ({ request }) => {
		const formData = await request.formData();
		const loginData = Object.fromEntries(formData);

		try {
			const { data } = await client.mutate({
				mutation: LOGIN_MUTATION,
				variables: loginData,
			});

			toast.success("Logged in successfully");
			store.dispatch(loginUser(data.login));
			return redirect("/");
		} catch (error) {
			// Handle GraphQL errors properly by checking graphQLErrors array
			const graphQLErrors = error.graphQLErrors;
			console.log(graphQLErrors);

			let errorMessage = "Please check your credentials"; // Default error message

			if (graphQLErrors && graphQLErrors.length > 0) {
				// Check if there's a specific error message in extensions
				errorMessage =
					graphQLErrors[0]?.extensions?.debugMessage || errorMessage;
			}

			// Display the error message
			toast.error(errorMessage);
			return null;
		}
	};

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loginAsGuestUser = async () => {
		try {
			const { data } = await client.mutate({
				mutation: LOGIN_MUTATION,
				variables: {
					identifier: "guest@example.com",
					password: "password",
				},
			});
			toast.success("Logged in as guest user");
			dispatch(loginUser(data.login));
			navigate("/");
		} catch (error) {
			console.error(error);
			toast.error("Failed to log in as guest user");
		}
	};

	return (
		<section className="h-screen grid place-items-center">
			<Form
				method="post"
				className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
			>
				<h4 className="text-center text-3xl font-bold">Login</h4>
				<FormInput type="text" label="user" name="identifier" />
				<FormInput type="password" label="password" name="password" />
				<div className="mt-4">
					<SubmitBtn text="login" />
				</div>
				<button
					type="button"
					className="btn btn-secondary btn-block"
					onClick={loginAsGuestUser}
				>
					Guest user
				</button>
				<p className="text-center">
					Not a member yet?{" "}
					<Link
						to="/register"
						className="ml-2 link-hover link-primary capitalize"
					>
						register
					</Link>
				</p>
			</Form>
		</section>
	);
}

export default Login;
