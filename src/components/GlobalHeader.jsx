import { useLocation } from "react-router-dom";
import UserAccount from "../components/UserAccount";
// import Notify from "../components/Notify";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { IconMenu } from "@tabler/icons-react";

const GlobalHeader = () => {
	// var [notifications, setnotifications] = useState([]);

	const location = useLocation();
	var currentLocation = location.pathname;

	var currentRoutes = currentLocation.split("/");

	currentRoutes = currentRoutes.filter(function (e) {
		return e.replace(/(\r\n|\n|\r)/gm, "");
	});

	const { t, changeLanguage, navToggle, setnavToggle, lang } = useContext(AuthContext);

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
		<div className="flex gap-4 flex-wrap justify-between items-center bg-gray-200 border-b border-gray-400 p-3 px-5  lg:h-[70px] h-auto">
			<div className="flex items-center gap-2">
				<button
					onClick={() => setnavToggle(!navToggle)}
					className="block md:hidden p-2 hover:bg-primary-100/10 rounded-lg">
					<IconMenu className="h-6 w-6 text-primary-400" />
				</button>
				<div className="flex gap-2 items-center justify-between text-gray-500">
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
			</div>

			<div className="">
				<select
					onChange={(e) => {
						changeLanguage(e.target.value);
					}}
					value={lang}
					className="!text-white  bg-amazon-600 hover:bg-amazon-500 !py-[7px] ">
					<option value="en">English</option>
					<option value="bn">Bangla</option>
					<option value="hi">Hindi</option>
					<option value="zh">Chinese</option>
					<option value="ja">Japanese</option>
					<option value="es">Spanish</option>
				</select>
				{/* <UserAccount /> */}
				{/* <Notify notifications={notifications} /> */}
			</div>
		</div>
	);
};

export default GlobalHeader;
