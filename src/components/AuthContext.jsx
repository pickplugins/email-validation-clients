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

	const checkUser = async () => {
		//console.log(token)

		if (!token) {
			setUser(null);
			setLoading(false);
			return;
		}

		try {
			const response = await axios.get(
				"http://localhost/wordpress/wp-json/email-validation/v2/validate_token/",
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			console.log(response.data.user);
			setUser(response.data.user);
		} catch (error) {
			//console.error("Invalid Token", error);
			//logout();
		} finally {
			setLoading(false);
		}
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
