import { useLocation } from "react-router-dom";
import UserAccount from "../components/UserAccount";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";


const UserProfileEdit = ({ user }) => {

	const { token, userData } = useContext(AuthContext);
	// var [userData, setuserData] = useState(user);
	var [editUserData, seteditUserData] = useState({});


	function updateUserProfile() {

		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}
		var postData = {
			id: userData.id,
			userData: editUserData,

		};


		postData = JSON.stringify(postData);

		fetch(appData.serverUrl + "wp-json/email-validation/v2/update_user_profile", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: postData,
		})
			.then((response) => {

				if (!response.ok) {
					throw new Error('Token validation failed');
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {


						setTimeout(() => {
						}, 500);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});

	}

	function getUserProfile() {

		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}



		var postData = {
			id: userData.id,

		};

		postData = JSON.stringify(postData);

		fetch(appData.serverUrl + "wp-json/email-validation/v2/get_user_profile", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: postData,
		})
			.then((response) => {
				if (response.ok && response.status < 400) {
					response.json().then((res) => {



						seteditUserData({ ...editUserData, ...res })



						setTimeout(() => {
						}, 500);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});

	}

	useEffect(() => {
		getUserProfile();
	}, []);

	const updateUserPassword = () => {
		console.log("Password Changed");
	}



	return (
		<div className="">
			<div className="">
				<div className="grid md:grid-cols-12 gap-5">
					<div className="md:col-span-8 bg-white rounded-sm">
						<form action="" className="p-5">
							<h3 className="mb-5 text-2xl">General Information</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div className="">
									<label htmlFor="" className="block">
										First Name
									</label>
									<input
										type="text"
										className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200"
										value={editUserData?.first_name}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, first_name: value });
										}}
									/>
								</div>

								<div className="">
									<label htmlFor="" className="block">
										Last Name
									</label>
									<input
										type="text"
										className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200"
										value={editUserData?.last_name}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, last_name: value });
										}}
									/>
								</div>
								<div className="">
									<label htmlFor="" className="block">
										Email
									</label>
									<input
										type="text"
										disabled
										className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full  bg-gray-200"
										value={editUserData?.email}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, email: value });
										}}
									/>
								</div>

								<div className="">
									<label htmlFor="" className="block">
										Phone
									</label>
									<input
										type="text"
										className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200"
										value={editUserData?.phone}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, phone: value });
										}}
									/>
								</div>
							</div>

							<h3 className="my-5 text-2xl">Address</h3>

							<div className="grid md:grid-cols-2 gap-8">
								<div className="">
									<label htmlFor="" className="block">
										Address 1
									</label>
									<input
										type="text"
										className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200"
										value={editUserData?.address_1}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, address_1: value });
										}}
									/>
								</div>
								<div className="">
									<label htmlFor="" className="block">
										Address 2
									</label>
									<input
										type="text"
										className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200"
										value={editUserData?.address_2}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, address_2: value });
										}}
									/>
								</div>

								<div className="">
									<label htmlFor="" className="block">
										Zip
									</label>
									<input
										type="text"
										className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200"
										value={editUserData?.zip_code}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, zip_code: value });
										}}
									/>
								</div>
								<div className="">
									<label htmlFor="" className="block">
										City
									</label>
									<input
										type="text"
										className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200"
										value={editUserData?.city}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, city: value });
										}}
									/>
								</div>
								<div className="">
									<label htmlFor="" className="block">
										Country
									</label>
									<input
										type="text"
										className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200"
										value={editUserData?.country}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, country: value });
										}}
									/>
								</div>
							</div>

							<div className="my-5">
								<input
									type="submit"
									value={"Update"}
									onClick={(ev) => {
										ev.preventDefault();

										updateUserProfile();
									}}
									className="p-2 hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white"
								/>
							</div>
						</form>
					</div>
					<div className="md:col-span-4 bg-white rounded-sm p-5">
						<h3 className="mb-5 text-2xl">Change Password</h3>
						<form className="grid grid-cols-1 gap-8">
							<div>
								<label htmlFor="" className="block">
									Old Password
								</label>
								<input
									type="password"
									className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200"
								/>
							</div>
							<div>
								<label htmlFor="" className="block">
									New Password
								</label>
								<input
									type="password"
									className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200"
								/>
							</div>
							<div>
								<label htmlFor="" className="block">
									Confirm Password
								</label>
								<input
									type="password"
									className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200"
								/>
							</div>
							<input
								type="submit"
								value={"Update"}
								onClick={(ev) => {
									ev.preventDefault();

									updateUserPassword();
								}}
								className="p-2 hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserProfileEdit