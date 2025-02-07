import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Navigate } from "react-router-dom";


const Login = () => {
	const [user, setUser] = useState({ username: "", password: "" });
	const [error, setError] = useState("");
	const [token, setToken] = useState("");

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleLogin = async (e) => {
		console.log(e);

		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost/wordpress/wp-json/jwt-auth/v1/token",
				{
					username: user.username,
					password: user.password,
				}
			);

			console.log(response);


			setToken(response.data.token);

			localStorage.setItem("token", response.data.token);
		} catch (error) {
			setError("Invalid credentials. Please try again.");
		}
	};

	return (
		<Layout>
			<div>
				<h2>Login</h2>
				<form onSubmit={handleLogin}>
					<div className="flex gap-2 items-center">
						<input
							className="border border-solid rounded-sm py-2 bg-gray-100 px-3"
							type="text"
							name="username"
							placeholder="Username"
							onChange={handleChange}
							required
						/>
						<input
							className="border border-solid rounded-sm py-2 bg-gray-100 px-3"

							type="password"
							name="password"
							placeholder="Password"
							onChange={handleChange}
							required
						/>
						<button
							className="border border-solid rounded-sm py-2 bg-gray-100 px-3"

							type="submit">Login</button>
					</div>
				</form>
				{error && <p>{error}</p>}
				{token && <Navigate to="/" />}
			</div>
		</Layout>

	);
};

export default Login;
