import { useLocation } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import Login from '../pages/Login';


const Sidebar = () => {

	const { user, loading } = useContext(AuthContext);

	const token = localStorage.getItem("token");


	const location = useLocation();
	var currentLocation = location.pathname


	var navs = [
		// { label: "Products", value: "products" },
		{ label: "Dashboard", value: "dashboard" },
		{ label: "Tasks", value: "tasks" },
		{ label: "Orders", value: "orders" },
		{ label: "Subscriptions", value: "subscriptions" },
		// { label: "Licenses", value: "licenses" },
		{ label: "API Keys", value: "apiKeys" },
		{ label: "Validation Requests", value: "ValidationRequests" },
	]

	return (
		<aside className="  min-w-[300px] bg-gray-200 text-gray-800 p-0">

			<div className="bg-blue-700 p-3 text-white">

				<div className="text-xl">IsSpammy</div>

			</div>

			{token ? (


				<>



					<div className="flex flex-col">
						{navs.map(
							(nav, index) => {
								return (
									<a
										key={index}
										href={`/${nav.value}`}
										className={`${currentLocation == "/" + nav.value ? "bg-gray-500" : "bg-gray-400"} hover:bg-gray-500 border-0 border-b border-solid border-gray-300 cursor-pointer px-4 py-2 `}>
										{nav.label}
									</a>
								);
							}
						)}

					</div>



				</>

			) : (
				<div className="flex flex-col">
					<a

						href={`/dashboard`}
						className={`bg-gray-500 hover:bg-gray-500 border-0 border-b border-solid border-gray-300 cursor-pointer px-4 py-2 `}>
						Dashboard
					</a>

				</div>
			)}





		</aside>
	);
}

export default Sidebar