import { useLocation } from "react-router-dom";
import UserAccount from "../components/UserAccount";
// import Notify from "../components/Notify";
import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "./AuthContext";


const GlobalHeader = () => {

	// var [notifications, setnotifications] = useState([]);


	const location = useLocation();
	var currentLocation = location.pathname

	var currentRoutes = currentLocation.split("/");

	currentRoutes = currentRoutes.filter(function (e) { return e.replace(/(\r\n|\n|\r)/gm, "") });

	const {t,changeLanguage} = useContext(AuthContext);


	var routesArgs = {

		products: { label: t("Products"), value: "products" },
		dashboard: { label: "", value: "dashboard" },
		orders: { label: t("Orders"), value: "orders" },
		tasks: { label: t("Tasks"), value: "tasks" },
		subscriptions: { label: t("Subscriptions"), value: "subscriptions" },
		licenses: { label: t("Licenses"), value: "licenses" },
		apiKeys: { label: t("API Keys"), value: "apiKeys" },
		ValidationRequests: { label: t("Validation Requests"), value: "ValidationRequests" },
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
		<div className="flex justify-between flex-wrap bg-gray-700 p-3 px-5 gap-3 md:h-[70px]">
			<div className="flex gap-2 items-center text-white">
				<Link to="/dashboard">{t("Dashboard")}</Link>

				{currentRoutes.map((route, index) => {
					return (

						<Link key={`index-${index}`} to={`/${route}`}> / {routesArgs[route] == undefined ? route : routesArgs[route].label}</Link>


					)
				})}

			</div>
<select onChange={(e) => { changeLanguage(e.target.value) }}>
	<option value="en">English</option>
	<option value="bn">Bangla</option>
</select>
			<div>
				<UserAccount />
				{/* <Notify notifications={notifications} /> */}
			</div>
		</div>
	);
}

export default GlobalHeader