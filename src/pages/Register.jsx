import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect } from "react-router-dom";
import { client } from "../ApolloClient";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
	const SIGNUP_MUTATION = gql`
		mutation signup($email: String!, $name: String!, $password: String!) {
			signup(email: $email, name: $name, password: $password) {
				jwt
				user {
					id
					name
					email
				}
			}
		}
	`;

	const formData = await request.formData();
	const signupData = Object.fromEntries(formData);

	try {
		const { data } = await client.mutate({
			mutation: SIGNUP_MUTATION,
			variables: signupData,
		});
		toast.success("account created successfully");
		console.log(data);

		return redirect("/login");
	} catch (error) {
		toast.error(error.message);
		return { error: error.message };
	}
};

const Register = () => {
	return (
		<section className="h-screen grid place-items-center">
			<Form
				method="POST"
				className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
			>
				<h4 className="text-center text-3xl font-bold">Register</h4>
				<FormInput type="text" label="username" name="name" />
				<FormInput type="email" label="email" name="email" />
				<FormInput type="password" label="password" name="password" />
				<div className="mt-4">
					<SubmitBtn text="register" />
				</div>

				<p className="text-center">
					Already a member?
					<Link
						to="/login"
						className="ml-2 link link-hover link-primary capitalize"
					>
						login
					</Link>
				</p>
			</Form>
		</section>
	);
};
export default Register;
