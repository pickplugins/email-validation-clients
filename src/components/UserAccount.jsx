import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


const UserAccount = ({ user }) => {

	const token = localStorage.getItem("token");


	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.href = "/dashboard";
	};

	var [modal, setmodal] = useState(false);


	return (
		<div className="">
			<div>


				{token ? (

					<>
						{user && (
							<div className="flex items-center gap-4">
								<div className="flex gap-3 text-white items-center">
									<span>{user?.total_credit}</span> /
									<span>{user?.total_used}</span>
								</div>


								<div title={user?.name} className=" relative">




									<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-500 cursor-pointer" onClick={ev => {
										setmodal(!modal)
									}}>
										<img className="w-full" src={user?.avatar} alt={user?.name} />
									</div>

									{modal && (
										<div className="absolute left-0 top-[100%] bg-white p-2 w-[300px] rounded-sm">
											<div className="my-3">Welcome! {user?.name}</div>
											<div className="p-2 hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white"
												onClick={ev => {
													handleLogout()
												}}>Log-out</div>
										</div>
									)}


								</div>


							</div>
						)}


						{!user && (
							<div className="p-2 hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white"
								onClick={ev => {
									handleLogout()
								}}>Log-out</div>
						)}
					</>



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