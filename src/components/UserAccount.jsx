import { useLocation } from "react-router-dom";


const UserAccount = ({ user }) => {

	const token = localStorage.getItem("token");

	//console.log(user);

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.href = "/dashboard";
	};


	return (
		<div className="">
			<div>


				{token ? (


					<div className="flex items-center gap-4">
						<div title={user?.name} className="w-10 h-10 rounded-full overflow-hidden border border-gray-500">
							<img className="w-full" src={user?.avatar} alt={user?.name} />
						</div>

						<div className="p-2 hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white"
							onClick={ev => {
								handleLogout()
							}}>Log-out</div>
					</div>

				) : (
					<div>
						<h2>Login</h2>

					</div>
				)}

			</div>
		</div>
	);
}

export default UserAccount