import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
export const AuthContext = createContext(null); // Set default value to null

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const checkUser = async () => {
		const token = localStorage.getItem("token");
		if (!token) {
			setUser(null);
			setLoading(false);
			return;
		}

		try {
			const response = await axios.get(
				"http://localhost/wordpress/wp-json/wp/v2/users/me",
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setUser(response.data);
		} catch (error) {
			console.error("Invalid Token or Expired");
			localStorage.removeItem("token");
			setUser(null);
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
