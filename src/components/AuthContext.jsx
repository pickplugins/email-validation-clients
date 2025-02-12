import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

// Create Context
export const AuthContext = createContext(null); // Set default value to null

const AuthProvider = ({ children }) => {
	const navigate = useNavigate()
	const [user, setUser] = useState(null);
	var [userData, setuserData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [logging, setlogging] = useState(false);
	const [token, setToken] = useState(localStorage.getItem("token") || null);
	const logout = () => {
		setToken(null);
		setUser(null);
		localStorage.removeItem("token");
	};


	var appData = window.appData;

function fetchUser() {
	// const token = localStorage.getItem("token");

	if (!token) {
		return;
		//throw new Error("No token found");
	}

	var postData = {};
	postData = JSON.stringify(postData);

	fetch(appData.serverUrl + "wp-json/email-validation/v2/get_user", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: postData,
	})
		.then((response) => {
			if (response.status == 429) {
				setloading(false);

				throw new Error("Too Many Requests");
			}
			if (!response.ok) {
				throw new Error("Token validation failed");
			}

			if (response.ok && response.status < 400) {
				response.json().then((res) => {
					setuserData(res.user);
					setTimeout(() => {}, 500);
				});
			}
		})
		.catch((_error) => {
			//this.saveAsStatus = 'error';
			// handle the error
		});
}

useEffect(() => {
	fetchUser();
},[]);

	const handleLogin = async (e) => {
		e.preventDefault();

		setlogging(true);
		console.log(user);
		var postData = {
			username: user.username,
			password: user.password,
		};
		postData = JSON.stringify(postData);
		console.log(postData);

		fetch(appData.serverUrl + "wp-json/jwt-auth/v1/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: postData,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Token validation failed");
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {
						console.log(res);
						setToken(res.token);

						localStorage.setItem("token", res.token);
						navigate("/orders");
						setTimeout(() => {}, 500);
					});
				}
				fetchUser()
				setlogging(false);
			})
			.catch((_error) => {
				setError("Invalid credentials. Please try again.");
				setlogging(false);
			});
	};



	useEffect(() => {
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, setUser, loading, handleLogin, logging, userData, token }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
