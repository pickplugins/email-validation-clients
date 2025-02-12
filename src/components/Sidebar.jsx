import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ user }) => {
	// const { user, loading } = useContext(AuthContext);
	console.log(user);
	var appData = window.appData;

	const token = localStorage.getItem("token");

	const location = useLocation();
	var currentLocation = location.pathname;

	var navs = [
		// { label: "Products", value: "products" },
		{ label: "Dashboard", value: "dashboard" },
		{ label: "Tasks", value: "tasks" },
		{ label: "Orders", value: "orders" },
		{ label: "Subscriptions", value: "subscriptions" },
		{ label: "Credits", value: "credits" },
		{ label: "CreditsLogs", value: "creditslogs" },
		// { label: "Licenses", value: "licenses" },
		{ label: "API Keys", value: "apiKeys" },
		{ label: "Validation Requests", value: "ValidationRequests" },
	];

	return (
		<aside className="min-w-[300px] bg-gray-200 text-gray-800 p-0">
			<div className="bg-blue-700 p-3 text-white ">
				<Link to={`${appData.appUrl}`} className="flex gap-3 items-center">
					<div className="w-[30px]">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="#fff"
							id="MASTER"
							viewBox="0 0 24 24">
							<path d="M18,18c-.5522,0-1,.4478-1,1v1c0,.5522,.4478,1,1,1s1-.4478,1-1v-1c0-.5522-.4478-1-1-1Z" />
							<path d="M24,16c0-1.1274-.1025-2.2798-.3062-3.4287-.2705-1.4897-1.1973-2.7559-2.543-3.4736-.0483-.0259-.1006-.0281-.1509-.0454v-2.0522c0-1.6543-1.3457-3-3-3h-1.0458l-1.8195-2.2998c-.7627-.9663-1.9053-1.5205-3.1348-1.5205s-2.3721,.5542-3.1343,1.5195l-1.82,2.3008h-1.0457c-1.6543,0-3,1.3457-3,3v2.0526c-.0502,.0172-.1025,.0193-.1509,.045-1.3457,.7178-2.2725,1.9839-2.5439,3.478-.2026,1.1445-.3052,2.2969-.3052,3.4243s.1025,2.2798,.3057,3.4258c.373,2.0913,2.0562,3.708,4.188,4.0234,2.4683,.3652,4.9937,.5508,7.5063,.5508,1.4769,0,2.9831-.0706,4.4801-.2026,.4864,.1277,.994,.2026,1.5199,.2026,3.3086,0,6-2.6914,6-6,0-.2446-.0191-.4844-.0477-.7215,.0268-.4087,.0477-.8364,.0477-1.2785Zm-3.2036-4.7222c.4811,.4304,.812,1.0029,.9287,1.6465,.025,.1409,.0347,.2817,.0563,.4227-.5814-.4733-1.252-.8407-1.9833-1.071l.9982-.9982ZM10.4346,2.9395c.7627-.9658,2.3677-.9668,3.1313,.001l.8381,1.0596h-4.8083l.8388-1.0605ZM4.7866,21.4707c-1.2808-.1895-2.29-1.1523-2.5117-2.395-.1826-1.0298-.2749-2.0645-.2749-3.0757s.0923-2.0459,.2739-3.0713c.1174-.6469,.4484-1.2202,.9297-1.6509l5.2593,5.2593c.9521,.9521,2.2286,1.4653,3.5373,1.4664,.0009,1.5244,.5776,2.9131,1.5181,3.9721-2.9447,.0922-5.8683-.0808-8.7316-.5049Zm7.5797-5.5151c-.91,.1105-1.8293-.1725-2.4894-.8325l-4.877-4.877v-3.2461c0-.5513,.4487-1,1-1h12c.5513,0,1,.4487,1,1v3.2461l-1.816,1.816c-2.2299,.3053-4.0688,1.8369-4.8176,3.8934Zm5.6337,6.0444c-2.2056,0-4-1.7944-4-4s1.7944-4,4-4,4,1.7944,4,4-1.7944,4-4,4Z" />
							<circle cx="18" cy="16" r="1" />
						</svg>
					</div>
					<div className="text-3xl">IsSpammy</div>
				</Link>
			</div>

			{token ? (
				<>
					<div className="flex flex-col">
						{navs.map((nav, index) => {
							return (
								<Link
									key={index}
									to={`/${nav.value}`}
									className={`${currentLocation == "/" + nav.value
										? "bg-gray-500"
										: "bg-gray-400"
										} hover:bg-gray-500 border-0 border-b border-solid border-gray-300 cursor-pointer px-4 py-2 `}>
									{nav.label}
								</Link>
							);
						})}
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
};

export default Sidebar;
