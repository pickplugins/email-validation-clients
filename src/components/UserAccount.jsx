import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Link, useLocation } from "react-router-dom";
import Popover from "../components/Popover";

import {
	IconMoodSad, IconDatabaseSmile
} from "@tabler/icons-react";


const UserAccount = () => {
	const navigate = useNavigate();

	const { userData, handleLogout } = useContext(AuthContext);

	const token = localStorage.getItem("token");



	var [buyCreditsPrams, setbuyCreditsPrams] = useState({ showPopup: false });
	var [hasCredit, sethasCredit] = useState(true);
	var [modal, setmodal] = useState(false);
	const [creditShow, setCreditShow] = useState(false);



	useEffect(() => {

		var remining = userData?.total_credit - userData?.total_credit_used;

		if (remining <= 0)
			sethasCredit(false)
	}, [hasCredit]);

	return (
		<div className="">

			{/* {JSON.stringify(userData)} */}


			<div className="flex items-center gap-3">

				<a href="https://isspammy.lemonsqueezy.com/buy/24f14039-0d6e-47c7-92ce-3d6a716f5d2d?embed=1" class="lemonsqueezy-button px-3 py-2 rounded-sm bg-amber-500 text-white cursor-pointer">Buy  Credits</a><script src="https://assets.lemonsqueezy.com/lemon.js" defer></script>

				{/* <div className="relative">
					<div className="px-3 py-2 rounded-sm bg-amber-500 text-white cursor-pointer"
						onClick={(ev) => {
							setbuyCreditsPrams({ ...buyCreditsPrams, show: !buyCreditsPrams?.show })
						}}
					>Buy Credits</div>
					{buyCreditsPrams.show && (
						<Popover className="top-full w-[500px] right-0 mt-2 bg-white px-4 py-3 rounded-sm border border-gray-200 text-gray-700 text-left">

							<div className="flex gap-3 items-center">


								
							</div>


						</Popover>
					)}

				</div> */}


				{token ? (
					<>
						{userData && (
							<div className="flex items-center gap-4">
								<div className="relative">
									<div
										className={`flex gap-3 text-white items-center ${hasCredit ? 'bg-gray-600' : 'bg-red-400 '}  px-3 py-2 rounded-sm`}
										onClick={() => {
											setCreditShow(!creditShow);
										}}>

										{!hasCredit && (
											<span className="animate-bounce ">
												<IconMoodSad />
											</span>
										)}
										{hasCredit && (
											<span className=" ">
												<IconDatabaseSmile />
											</span>
										)}


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
													<li className="font-bold">Total Used: {userData?.total_credit_used}</li>
													<li className="font-bold">Reminaing Credits: {userData?.total_credit - userData?.total_credit_used}</li>
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
												<Link to={`/editprofile`} className="p-2 inline hover:bg-blue-400 rounded-sm cursor-pointer px-4 bg-blue-600 text-white">Edit Profile</Link>
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
