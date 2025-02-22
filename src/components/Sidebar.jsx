import {
	IconBasketCheck,
	IconBrandCitymapper,
	IconCards,
	IconCloudDataConnection,
	IconDashboard,
	IconList,
	IconRotateRectangle,
	IconX,
} from "@tabler/icons-react";
import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Accounts from "./Accounts";
import { AuthContext } from "./AuthContext";

const Sidebar = ({ user }) => {
	const { navToggle, setnavToggle, changeLanguage, lang, t } = useContext(AuthContext);
	var appData = window.appData;

	const token = localStorage.getItem("token");

	const location = useLocation();
	var currentLocation = location.pathname;

	var navs = [
		// { label: "Products", value: "products" },
		{ label: t("Dashboard"), value: "dashboard", icon: <IconDashboard /> },
		{ label: t("Tasks"), value: "tasks", icon: <IconList /> },
		{ label: t("Orders"), value: "orders", icon: <IconBasketCheck /> },
		{
			label: t("Subscriptions"),
			value: "subscriptions",
			icon: <IconRotateRectangle />,
		},
		{ label: t("Credits"), value: "credits", icon: <IconCards /> },
		// { label: "CreditsLogs", value: "creditslogs", icon: <IconDatabaseEdit /> },
		// { label: "Licenses", value: "licenses", icon: ""  },
		{
			label: t("API Keys"),
			value: "apiKeys",
			icon: <IconCloudDataConnection />,
		},
		// { label: t("ApiKeysDetails"), value: "ApiKeysDetails", icon: <IconCloudDataConnection /> },
		{
			label: t("All API Requests"),
			value: "apirequests",
			icon: <IconBrandCitymapper />,
		},
		// {
		// 	label: t("Spammers"),
		// 	value: "Spammers",
		// 	icon: <IconAlien />,
		// },
	];

	// const [toggle, settoggle] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setnavToggle(true);
			}
		};

		// Run once on mount to ensure correct state
		handleResize();

		// Listen for window resize
		window.addEventListener("resize", handleResize);

		// Cleanup listener on unmount
		return () => window.removeEventListener("resize", handleResize);
	}, [setnavToggle]);

	return (
		<aside
			className={`max-w-[300px]  flex flex-col h-screen  text-gray-800 px-5 py-5 fixed md:static inset-y-0 left-0 z-50 transform bg-white transition-transform duration-200 ease-in-out md:transform-none
					${navToggle ? "translate-x-0" : "-translate-x-full"} ${
						!navToggle && "lg:w-[300px] "
					}`}>
			<div className="bg-white pb-3 block mb-5 border-b relative">
				<button
					onClick={() => setnavToggle(!navToggle)}
					className="md:hidden p-2 rounded-lg text-error-500 absolute top-0 right-0">
					<IconX className="h-5 w-5" />
				</button>
				<div className="flex gap-3 items-center mb-3">
					{/* <div className={`  ${navToggle ? "" : "hidden "}  `}>
						<img src="/logo-shape.png" alt="" />
					</div> */}
					<div
						className={` md:block text-3xl"
						} flex gap-3 justify-between items-center w-full`}>
						<div className="flex gap-3 items-center justify-between">
							<Link to={`/`} className="text-center">
								<img src="/logo-h.png" className="mx-auto" width={140} alt="" />
							</Link>
						</div>
					</div>
				</div>
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
			</div>

			{token ? (
				<>
					<div className="flex flex-col flex-1">
						{navs.map((nav, index) => {
							return (
								<Link
									key={index}
									to={`/${nav.value}`}
									className={`${
										currentLocation == "/" + nav.value
											? "bg-amazon-600 text-white"
											: "bg-white"
									} hover:bg-amazon-600 hover:text-white mb-2 rounded-sm  text-gray-500 border-0  border-solid border-gray-300 cursor-pointer px-4 py-2 flex items-center gap-2`}>
									<span className="">{nav.icon}</span>{" "}
									<span
									// className={`${navToggle ? "hidden" : "hidden md:block"}`}
									>
										{nav.label}
									</span>
								</Link>
							);
						})}

						{/* <div
							onClick={() => setnavToggle(!navToggle)}
							className="px-4 py-2 hidden md:block w-full cursor-pointer rounded-sm  text-gray-500 hover:text-white hover:bg-amazon-600">
							{navToggle ? (
								<IconLayoutSidebarRightCollapse />
							) : (
								<IconLayoutSidebarLeftCollapse />
							)}
						</div> */}
					</div>
				</>
			) : (
				<div className="flex flex-col">
					<a
						href={`/dashboard`}
						className={`bg-amazon-600 text-white  hover:bg-amazon-600 hover:text-white mb-2 rounded-sm  text-gray-500 border-0  border-solid border-gray-300 cursor-pointer px-4 py-2 flex items-center gap-2 `}>
						{t("Dashboard")}
					</a>
				</div>
			)}
			<div>
				<Accounts />
			</div>
		</aside>
	);
};

export default Sidebar;
