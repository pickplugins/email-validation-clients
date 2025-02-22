import React, { useContext, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { AuthContext } from "./AuthContext";


const Login = () => {
	const navigate = useNavigate();
	const { user, setUser, handleLogin, logging, t } = useContext(AuthContext);
	// const [user, setUser] = useState({ username: "", password: "" });
	const [error, setError] = useState("");
	const [token, setToken] = useState("");
	var [appData, setappData] = useState(window.appData);

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};






	return (
		<div>
			<form onSubmit={handleLogin}>
				<div className="grid grid-cols-1 gap-5">
					<div>
						<label htmlFor="" className="block">
							{t("User Name")}
						</label>
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
						<label htmlFor="" className="block">
							{t("Password")}
						</label>

						<input
							className="p-3 py-[5px] bg-gray-400 border rounded-sm border-solid w-full"
							type="password"
							name="password"
							placeholder={t("Password")}
							onChange={handleChange}
							required
						/>
					</div>
					<button
						className="p-3 py-[5px]  text-white cursor-pointer border rounded-sm border-solid w-full flex gap-2 items-center justify-center"
						type="submit">
						{t("Login")} {logging && <Spinner />}
					</button>
				</div>
			</form>
			{error && <p>{error}</p>}
			{token && <Navigate to="/orders" />}
		</div>
	);
};

export default Login;
