import React, { useState } from "react";
import axios from "axios";

const Login = () => {
	const [user, setUser] = useState({ username: "", password: "" });
	const [error, setError] = useState("");
	const [token, setToken] = useState("");

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost/wordpress/wp-json/jwt-auth/v1/token",
				{
					username: user.username,
					password: user.password,
				}
			);
			setToken(response.data.token);

			console.log(response);
			localStorage.setItem("token", response.data.token);
		} catch (error) {
			setError("Invalid credentials. Please try again.");
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<input
					type="text"
					name="username"
					placeholder="Username"
					onChange={handleChange}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={handleChange}
					required
				/>
				<button type="submit">Login</button>
			</form>
			{error && <p>{error}</p>}
			{token && <p>Logged in! Token saved.</p>}
		</div>
	);
};

export default Login;
