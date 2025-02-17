import React, { useContext, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";
import { AuthContext } from "./AuthContext";


const Register = () => {
	const [user, setUser] = useState({ email: "", password: "" });
	const { t } = useContext(AuthContext);
	const [messages, setMessages] = useState(null);
	const [errors, seterrors] = useState(null);
	const [token, setToken] = useState("");
	var [appData, setappData] = useState(window.appData);
	const [logging, setlogging] = useState(false);

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};


	function handleRegister(e) {


		e.preventDefault();
		setlogging(true);

		if (user.email.length == 0 || user.password.length == 0) {
			alert("email or password should not empty");
			return;
		}

		seterrors(false)



		var postData = JSON.stringify(user);

		fetch(appData.serverUrl + "wp-json/email-validation/v2/register_user", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: postData,
		})
			.then((response) => {

				if (!response.ok) {
					throw new Error('Token validation failed');
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {


						var result = JSON.parse(res)

						var error = result.error

						seterrors(error)


						var success = result.success
						var messages = result.messages

						console.log(messages);
						setMessages(messages)


						setlogging(false);


						setTimeout(() => {
						}, 500);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
				setlogging(false);
			});

	}

	return (

		<div>
			<form onSubmit={handleRegister}>
				<div className="grid grid-cols-1 gap-5">
					<div>
						<label htmlFor="" className="block">{t("Email")}</label>
						<input
							className="p-3 py-[5px] bg-gray-400 border rounded-sm border-solid w-full"
							type="email"
							name="email"
							placeholder={t("Email")}
							onChange={handleChange}
							required
						/>
					</div>

					<div>
						<label htmlFor="" className="block">{t("Password")}</label>

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
						className="p-3 py-[5px] bg-gray-700 text-white cursor-pointer border rounded-sm border-solid w-full flex gap-2 items-center justify-center"

						type="submit">{t("Register")} {logging && <Spinner />}</button>
				</div>
			</form>

			{errors && (
				<div className="text-red-600">
					{messages != null && (
						<>
							{Object.entries(messages).map(message => {
								return (
									<p>{message}</p>
								)
							})}						</>
					)}
				</div>
			)}
			{!errors && (
				<div className="text-green-700">
					{messages != null && (
						<>
							{Object.entries(messages).map(args => {
								return (
									<p>{args[1]}</p>
								)
							})}
						</>
					)}
				</div>
			)}





			{/* {token && <Navigate to="/" />} */}
		</div>


	);
};

export default Register;
