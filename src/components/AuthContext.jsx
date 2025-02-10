import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
export const AuthContext = createContext(null); // Set default value to null

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [token, setToken] = useState(localStorage.getItem("token") || null);

	const logout = () => {
		setToken(null);
		setUser(null);
		localStorage.removeItem("token");
	};


	var appData = window.appData;

	console.log(appData);


	const checkUser = async () => {
		//console.log(token)

		if (!token) {
			setUser(null);
			setLoading(false);
			return;
		}

		// try {
		// 	const response = await axios.get(
		// 		appData.serverUrl + "/wp-json/email-validation/v2/validate_token/",
		// 		{
		// 			headers: { Authorization: `Bearer ${token}` },
		// 		}
		// 	);

		// 	console.log(response.data.user);
		// 	setUser(response.data.user);
		// } catch (error) {
		// 	//console.error("Invalid Token", error);
		// 	//logout();
		// } finally {
		// 	setLoading(false);
		// }

		var postData = {}


		fetch(appData.serverUrl + "wp-json/email-validation/v2/validate_token/", {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
			body: postData,
		})
			.then((response) => {

				if (!response.ok) {
					throw new Error('Token validation failed');
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {


						console.log(res);
						// setToken(res.token);
						setUser(res.user)
						// localStorage.setItem("token", res.token);
						setTimeout(() => {
						}, 500);
					});
				}
			})
			.catch((_error) => {
				//setError("Invalid credentials. Please try again.");
			});


	};


	useEffect(() => {
		checkUser();
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading, checkUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
