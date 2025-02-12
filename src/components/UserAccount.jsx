import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const UserAccount = () => {
	const navigate = useNavigate();

	const { userData } = useContext(AuthContext);

	const token = localStorage.getItem("token");

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

	var [modal, setmodal] = useState(false);
	const [creditShow, setCreditShow] = useState(false);

	return (
		<div className="">

			{JSON.stringify(userData)}


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
										<span>{userData?.total_used}</span>
									</div>
									{creditShow && (
										<div className="absolute z-[99] right-0 top-[100%] mt-2 bg-white p-2 w-[300px] rounded-sm">
											<div className="my-3">Welcome! {userData?.name}</div>
										</div>
									)}
								</div>

								<div title={userData?.name} className=" relative">
									<div
										className="w-10 h-10 rounded-full overflow-hidden border border-gray-500 cursor-pointer"
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
										<div className="absolute z-[99] right-0 top-[100%] mt-2 bg-white p-2 w-[300px] rounded-sm">
											<div className="my-3">Welcome! {userData?.name}</div>
											<div
												className="p-2 hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white"
												onClick={(ev) => {
													handleLogout();
												}}>
												Log-out
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
