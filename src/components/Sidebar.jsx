import { useLocation } from "react-router-dom";


const Sidebar = () => {

	const location = useLocation();
	var currentLocation = location.pathname
	console.log(location.pathname)


	var navs = [
		// { label: "Products", value: "products" },
		{ label: "Dashboard", value: "dashboard" },
		{ label: "Login", value: "login" },
		{ label: "Orders", value: "orders" },
		{ label: "Subscriptions", value: "subscriptions" },
		{ label: "Licenses", value: "licenses" },
		{ label: "API Keys", value: "apiKeys" },
		{ label: "Validation Requests", value: "ValidationRequests" },
	]

	return (
		<aside className="flex flex-col  min-w-[300px] bg-gray-200 text-gray-800 p-0">
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
		</aside>
	);
}

export default Sidebar