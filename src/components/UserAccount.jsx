import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Link, useLocation } from "react-router-dom";
import { MoonIcon, SunIcon } from "./Icons";

const UserAccount = () => {
	const navigate = useNavigate();

	const { userData, theme, toggleTheme, token } = useContext(AuthContext);
	
	console.log(userData)




	var [modal, setmodal] = useState(false);
	const [creditShow, setCreditShow] = useState(false);

	return (
		<div className=" flex items-center gap-4">
			{/* {JSON.stringify(userData)} */}
			<button
				onClick={toggleTheme}
				className={`ml-3 flex items-center justify-center rounded-full p-1 ${
					theme === "light"
						? "!bg-primary-300 !text-primary-800"
						: "!bg-primary-600 !text-primary-200"
				}`}>
				{theme === "dark" ? (
					<SunIcon className={"fill-primary-400"} />
				) : (
					<MoonIcon className={"fill-primary-400"} />
				)}
			</button>
			<div>
				{token ? (
					<>
						{userData && (
							<div className="flex items-center gap-4">
								<div className="relative">
									<div
										className="flex gap-3 text-white items-center bg-gray-600 px-3 py-2 rounded-sm"
										onClick={() => {
											setCreditShow(!creditShow);
										}}>
										<span>Credits: </span>
										<span>{userData?.total_credit}</span> /
										<span>{userData?.total_credit_used}</span>
									</div>
									{creditShow && (
										<div className="absolute shadow-lg border border-gray-200 z-[99] right-0 top-[100%] mt-2 bg-white p-2 w-[300px] rounded-sm">
											<div className="p-3 ">
												<ul>
													<li>Total Credits: {userData?.total_credit}</li>
													<li>Used by Task: {userData?.credit_used_cron}</li>
													<li>Used by API: {userData?.credit_used_api}</li>
													<li className="font-bold">
														Total Used: {userData?.total_credit_used}
													</li>
													<li className="font-bold">
														Reminaing Credits:{" "}
														{userData?.total_credit -
															userData?.total_credit_used}
													</li>
												</ul>
											</div>
										</div>
									)}
								</div>

								<div title={userData?.name} className=" relative">
									<div
										className="w-10 h-10 rounded-full overflow-hidden border border-gray-500 cursor-pointer "
										onClick={(ev) => {
											setmodal(!modal);
										}}>
										<img
											className="w-full"
											src={userData?.avatar}
											alt={userData?.name}
										/>
									</div>

									{modal && (
										<div className="absolute z-[99] shadow-lg border border-gray-200 right-0 top-[100%] bg-white p-3 w-[300px] rounded-sm">
											<div className="mb-3">Welcome! {userData?.name}</div>

											<div className="flex gap-3 items-center">
												<Link
													to={`/editprofile`}
													className="p-2 inline hover:bg-blue-400 rounded-sm cursor-pointer px-4 bg-blue-600 text-white">
													Edit Profile
												</Link>
												<div
													className="p-2 inline hover:bg-blue-400 rounded-sm cursor-pointer px-4 bg-blue-600 text-white"
													onClick={(ev) => {
														handleLogout();
													}}>
													Log-out
												</div>
											</div>
										</div>
									)}
								</div>
							</div>
						)}

						{!userData && (
							<div
								className="p-2 hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white"
								onClick={(ev) => {
									handleLogout();
								}}>
								Log-out
							</div>
						)}
					</>
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
};

export default UserAccount;
