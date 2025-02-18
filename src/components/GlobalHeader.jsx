import { useLocation } from "react-router-dom";
import UserAccount from "../components/UserAccount";
// import Notify from "../components/Notify";
import { IconLanguage } from "@tabler/icons-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const GlobalHeader = () => {
	// var [notifications, setnotifications] = useState([]);

	const location = useLocation();
	var currentLocation = location.pathname;

	var currentRoutes = currentLocation.split("/");

	currentRoutes = currentRoutes.filter(function (e) {
		return e.replace(/(\r\n|\n|\r)/gm, "");
	});

	const { t, changeLanguage, lang } = useContext(AuthContext);

	var routesArgs = {
		products: { label: t("Products"), value: "products" },
		dashboard: { label: "", value: "dashboard" },
		orders: { label: t("Orders"), value: "orders" },
		tasks: { label: t("Tasks"), value: "tasks" },
		subscriptions: { label: t("Subscriptions"), value: "subscriptions" },
		licenses: { label: t("Licenses"), value: "licenses" },
		apiKeys: { label: t("API Keys"), value: "apiKeys" },
		ValidationRequests: {
			label: t("Validation Requests"),
			value: "ValidationRequests",
		},
	};

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
		<div className="flex justify-between flex-wrap bg-primary-800 dark:bg-primary-200 text-primary-200 dark:text-primary-800 p-3 px-5 gap-3 md:h-[70px]">
			<div className="flex gap-2 items-center">
				<Link to="/dashboard">{t("Dashboard")}</Link>

				{currentRoutes.map((route, index) => {
					return (
						<Link key={`index-${index}`} to={`/${route}`}>
							{" "}
							/{" "}
							{routesArgs[route] == undefined ? route : routesArgs[route].label}
						</Link>
					);
				})}
			</div>
			<div className="flex items-center flex-wrap gap-2">
				<label className="flex items-center border border-primary-200 dark:border-primary-800 rounded-md px-2 py-1">
					<IconLanguage />
					<select
						onChange={(e) => {
							changeLanguage(e.target.value);
						}}
						value={lang}
						className="!border-0 ">
						<option value="en">English</option>
						<option value="bn">Bengali</option>
						<option value="hi">Hindi</option>
						<option value="zh">Chinese</option>
						<option value="ja">Japanese</option>
						<option value="es">Spanish</option>
					</select>
				</label>
				<UserAccount />
				{/* <Notify notifications={notifications} /> */}
			</div>
		</div>
	);
};

export default GlobalHeader;
