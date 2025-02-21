import {
	IconBasketCheck,
	IconBrandCitymapper,
	IconCards,
	IconCloudDataConnection,
	IconDashboard,
	IconDatabaseEdit,
	IconLayoutSidebarLeftCollapse,
	IconLayoutSidebarRightCollapse,
	IconList,
	IconRotateRectangle,
	IconAlien,
} from "@tabler/icons-react";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Sidebar = ({ user }) => {
	const { navToggle, setnavToggle, t } = useContext(AuthContext);
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
		{ label: t("API Keys"), value: "apiKeys", icon: <IconCloudDataConnection /> },
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

	return (
		<aside
			className={`max-w-[300px]    text-gray-800 p-0 ${!navToggle && "lg:w-[300px] "
				}`}>
			<div className="bg-white px-5 py-3  h-[70px] block mb-5">
				<div className="flex gap-3 items-center">
					<div className="w-[30px]   sm:block xl:hidden">


						<img src="/logo-shape.png" alt="" />


					</div>
					<div
						className={`${navToggle ? "hidden" : "hidden md:block text-3xl"
							} flex gap-3 justify-between items-center w-full`}>
						<div className="flex gap-3 items-center justify-between">
							<Link to={`/`} className="text-center">



								<img src="/logo-h.png" className="mx-auto" width={140} alt="" />






							</Link>
							{/* <span className="bg-amazon-400 text-white rounded-sm px-3 py-1 inline text-[14px]">
								{t("Beta")}
							</span> */}
						</div>
					</div>
				</div>
			</div>

			{token ? (
				<>
					<div className="flex flex-col px-5">
						{navs.map((nav, index) => {
							return (
								<Link
									key={index}
									to={`/${nav.value}`}
									className={`${currentLocation == "/" + nav.value
										? "bg-amazon-600 text-white"
										: "bg-white"
										} hover:bg-amazon-600 hover:text-white mb-2 rounded-sm  text-gray-500 border-0  border-solid border-gray-300 cursor-pointer px-4 py-2 flex items-center gap-2`}>
									<span className="">{nav.icon}</span>{" "}
									<span
										className={`${navToggle ? "hidden" : "hidden md:block"}`}>
										{nav.label}
									</span>
								</Link>
							);
						})}

						<div
							onClick={() => setnavToggle(!navToggle)}
							className="px-4 py-2 hidden md:block w-full cursor-pointer rounded-sm  text-gray-500 hover:text-white hover:bg-amazon-600">
							{navToggle ? (
								<IconLayoutSidebarRightCollapse />
							) : (
								<IconLayoutSidebarLeftCollapse />
							)}
						</div>
					</div>

				</>
			) : (
				<div className="flex flex-col">
					<a
						href={`/dashboard`}
						className={`bg-gray-500 hover:bg-gray-500 border-0 border-b border-solid border-gray-300 cursor-pointer px-4 py-2 `}>
						{t("Dashboard")}
					</a>
				</div>
			)}
		</aside>
	);
};

export default Sidebar;
