const Sidebar = () => {

	var navs = [
		{ label: "products", value: "products" },
		{ label: "orders", value: "orders" },
		{ label: "subscriptions", value: "subscriptions" },
		{ label: "licenses", value: "licenses" },
	]

	return (
		<aside className="flex flex-col  min-w-[300px] bg-gray-200 text-gray-800 p-0">
			{navs.map(
				(nav, index) => {
					return (
						<a
							key={index}
							href={`/${nav.value}`}
							className="hover:bg-gray-300 border-0 border-b border-solid border-gray-300 cursor-pointer px-4 py-2 bg-gray-400">
							{nav.value}
						</a>
					);
				}
			)}
		</aside>
	);
}

export default Sidebar