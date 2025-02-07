import { useLocation } from "react-router-dom";
import UserAccount from "../components/UserAccount";
import { useState, useEffect } from "react";


const UserProfileEdit = (user) => {


	var [userData, setuserData] = useState(user.user);
	var [editUserData, seteditUserData] = useState({});

	const validateToken = async () => {
		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		try {
			const response = await fetch('http://localhost/wordpress/wp-json/email-validation/v2/validate_token', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			});

			console.log(response);

			if (!response.ok) {
				throw new Error('Token validation failed');
			}

			return true;
		} catch (error) {
			console.error('Token validation error:', error);
			// You might want to handle token expiration here
			// For example, redirect to login page
			//localStorage.removeItem("token");
			//window.location.href = '/login';
			return false;
		}
	};

	// Example usage with updateUserProfile
	const handleProfileUpdate = async () => {
		console.log("handleProfileUpdate");
		try {
			const isTokenValid = await validateToken();
			if (isTokenValid) {
				await updateUserProfile();
			}
		} catch (error) {
			console.error('Profile update failed:', error);
			// Handle error appropriately
		}
	};

	function updateUserProfile() {

		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}
		var postData = {
			id: userData.id,
			userData: editUserData,

		};

		console.log(postData);
		// http://localhost/wordpress/wp-json/email-validation/v2/validate_token

		postData = JSON.stringify(postData);

		fetch("http://localhost/wordpress/wp-json/email-validation/v2/update_user_profile", {
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


						console.log(res);

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

		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}



		var postData = {
			id: userData.id,

		};

		postData = JSON.stringify(postData);

		fetch("http://localhost/wordpress/wp-json/email-validation/v2/get_user_profile", {
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


						console.log(res);

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




	return (
		<div className="">

			<div className="">

				<div className="grid grid-cols-12 gap-5">

					<div className="col-span-8 bg-white rounded-sm">
						<form action="" className="p-5">

							<h3 className="my-5 text-2xl">General Information</h3>

							<div className="grid grid-cols-2 gap-8">
								<div className="">
									<label htmlFor="" className="block">First Name</label>
									<input type="text" className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200" value={editUserData?.first_name} onChange={ev => {

										var value = ev.target.value;
										seteditUserData({ ...editUserData, first_name: value })

									}} />
								</div>

								<div className="">
									<label htmlFor="" className="block">Last Name</label>
									<input type="text" className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200" value={editUserData?.last_name} onChange={ev => {

										var value = ev.target.value;
										seteditUserData({ ...editUserData, last_name: value })

									}} />
								</div>
								<div className="">
									<label htmlFor="" className="block">Email</label>
									<input type="text" disabled className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full  bg-gray-200" value={editUserData?.email} onChange={ev => {

										var value = ev.target.value;
										seteditUserData({ ...editUserData, email: value })

									}} />
								</div>

								<div className="">
									<label htmlFor="" className="block">Phone</label>
									<input type="text" className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200" value={editUserData?.phone} onChange={ev => {

										var value = ev.target.value;
										seteditUserData({ ...editUserData, phone: value })

									}} />
								</div>
							</div>

							<h3 className="my-5 text-2xl">Address</h3>

							<div className="grid grid-cols-2 gap-8">

								<div className="">
									<label htmlFor="" className="block">Address 1</label>
									<input type="text" className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200" value={editUserData?.address_1} onChange={ev => {

										var value = ev.target.value;
										seteditUserData({ ...editUserData, address_1: value })

									}} />
								</div>
								<div className="">
									<label htmlFor="" className="block">Address 2</label>
									<input type="text" className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200" value={editUserData?.address_2} onChange={ev => {

										var value = ev.target.value;
										seteditUserData({ ...editUserData, address_2: value })

									}} />
								</div>


								<div className="">
									<label htmlFor="" className="block">Zip</label>
									<input type="text" className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200" value={editUserData?.zip_code} onChange={ev => {

										var value = ev.target.value;
										seteditUserData({ ...editUserData, zip_code: value })

									}} />
								</div>
								<div className="">
									<label htmlFor="" className="block">City</label>
									<input type="text" className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200" value={editUserData?.city} onChange={ev => {

										var value = ev.target.value;
										seteditUserData({ ...editUserData, city: value })

									}} />
								</div>
								<div className="">
									<label htmlFor="" className="block">Country</label>
									<input type="text" className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200" value={editUserData?.country} onChange={ev => {

										var value = ev.target.value;
										seteditUserData({ ...editUserData, country: value })

									}} />
								</div>


							</div>

							<div className="my-5">
								<input type="submit" value={"Update"} onClick={ev => {
									ev.preventDefault();

									updateUserProfile()
									//handleProfileUpdate()
								}} className="p-2 hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white" />
							</div>



						</form>
					</div>
					<div className="col-span-4 bg-white rounded-sm"></div>

				</div>


			</div>

		</div>
	);
}

export default UserProfileEdit