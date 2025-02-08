import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Navigate } from "react-router-dom";


const Login = () => {
	const [user, setUser] = useState({ username: "", password: "" });
	const [error, setError] = useState("");
	const [token, setToken] = useState("");
	var [appData, setappData] = useState(window.appData);

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleLogin = async (e) => {

		e.preventDefault();
		try {
			const response = await axios.post(
				appData.serverUrl + "wp-json/jwt-auth/v1/token",
				{
					username: user.username,
					password: user.password,
				}
			);



			setToken(response.data.token);

			localStorage.setItem("token", response.data.token);
		} catch (error) {
			setError("Invalid credentials. Please try again.");
		}
	};

	return (

		<div>
			<form onSubmit={handleLogin}>
				<div className="grid grid-cols-1 gap-5">
					<div>
						<label htmlFor="" className="block">User Name</label>
						<input
							className="p-3 py-[5px] bg-gray-400 border rounded-sm border-solid w-full"
							type="text"
							name="username"
							placeholder="Username"
							onChange={handleChange}
							required
						/>
					</div>

					<div>
						<label htmlFor="" className="block">Password</label>

						<input
							className="p-3 py-[5px] bg-gray-400 border rounded-sm border-solid w-full"

							type="password"
							name="password"
							placeholder="Password"
							onChange={handleChange}
							required
						/>
					</div>
					<button
						className="p-3 py-[5px] bg-gray-400 border rounded-sm border-solid w-full"

						type="submit">Login</button>
				</div>
			</form>
			{error && <p>{error}</p>}
			{token && <Navigate to="/orders" />}
		</div>


	);
};

export default Login;
