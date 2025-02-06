import { useLocation } from "react-router-dom";
import UserAccount from "../components/UserAccount";


const GlobalHeader = ({ user }) => {

	const location = useLocation();
	var currentLocation = location.pathname

	var currentRoutes = currentLocation.split("/");

	currentRoutes = currentRoutes.filter(function (e) { return e.replace(/(\r\n|\n|\r)/gm, "") });




	var routesArgs = {

		products: { label: "Products", value: "products" },
		dashboard: { label: "", value: "dashboard" },
		orders: { label: "Orders", value: "orders" },
		subscriptions: { label: "Subscriptions", value: "subscriptions" },
		licenses: { label: "Licenses", value: "licenses" },
		apiKeys: { label: "API Keys", value: "apiKeys" },
		ValidationRequests: { label: "Validation Requests", value: "ValidationRequests" },
	}

	return (
		<div className="flex justify-between bg-gray-200 p-3 px-5 gap-3">
			<div className="flex gap-2 items-center">
				<a href="/dashboard">Dashboard</a>

				{currentRoutes.map((route, index) => {
					return (

						<a key={`index-${index}`} href={`/${route}`}> / {routesArgs[route] == undefined ? route : routesArgs[route].label}</a>


					)
				})}

			</div>

			<div>
				<UserAccount user={user} />
			</div>
		</div>
	);
}

export default GlobalHeader