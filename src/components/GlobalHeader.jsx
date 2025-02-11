import { useLocation } from "react-router-dom";
import UserAccount from "../components/UserAccount";
// import Notify from "../components/Notify";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


const GlobalHeader = ({ user }) => {

	// var [notifications, setnotifications] = useState([]);


	const location = useLocation();
	var currentLocation = location.pathname

	var currentRoutes = currentLocation.split("/");

	currentRoutes = currentRoutes.filter(function (e) { return e.replace(/(\r\n|\n|\r)/gm, "") });


	var routesArgs = {

		products: { label: "Products", value: "products" },
		dashboard: { label: "", value: "dashboard" },
		orders: { label: "Orders", value: "orders" },
		tasks: { label: "Tasks", value: "tasks" },
		subscriptions: { label: "Subscriptions", value: "subscriptions" },
		licenses: { label: "Licenses", value: "licenses" },
		apiKeys: { label: "API Keys", value: "apiKeys" },
		ValidationRequests: { label: "Validation Requests", value: "ValidationRequests" },
	}


	// addNotifications({
	// 	title: "Data Saved!",
	// 	content: "You change successfully saved!.",
	// 	type: "success",
	// });


	// function addNotifications(notification) {
	// 	var notificationsX = [...notifications];
	// 	notificationsX.push(notification);
	// 	setnotifications(notificationsX);
	// }

	// useEffect(() => {
	// 	setnotifications(notifications);

	// 	const timer = setTimeout(() => {
	// 		setnotifications([]); // Update the debounced value after delay
	// 	}, 5000); // 300ms debounce delay

	// 	return () => clearTimeout(timer); // Cleanup timer on value change or unmount
	// }, [notifications]);

	return (
		<div className="flex justify-between bg-gray-700 p-3 px-5 gap-3">
			<div className="flex gap-2 items-center text-white">
				<Link to="/dashboard">Dashboard</Link>

				{currentRoutes.map((route, index) => {
					return (

						<Link key={`index-${index}`} to={`/${route}`}> / {routesArgs[route] == undefined ? route : routesArgs[route].label}</Link>


					)
				})}

			</div>

			<div>
				<UserAccount user={user} />
				{/* <Notify notifications={notifications} /> */}
			</div>
		</div>
	);
}

export default GlobalHeader