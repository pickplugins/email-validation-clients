import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import EntriesTable from "../components/EntriesTable";
import Layout from "../components/Layout";
import Popover from "../components/Popover";

function Credits() {
	const { userData, handleLogout } = useContext(AuthContext);


	var [appData, setappData] = useState(window.appData);
	var [userRoles, setuserRoles] = useState(null);


	useEffect(() => {
		console.log(userData?.roles);
		if (userData != undefined || userData != null) {

			var roles = [];

			Object.entries(userData?.roles).map(args => {

				var role = args[1]

				roles.push(role)

			})

			setuserRoles(roles);

		}
	}, [userData]);

	const { token } = useContext(AuthContext);

	var [creditsData, setcreditsData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({
		keyword: "",
		page: 1,
		order: "DESC",
		limit: 10,
		first_date: "",
		last_date: "",
		type: "credit",
	});

	var [addCredits, setaddCredits] = useState({
		amount: 100,
		type: "",
		source: "",
		userid: 1,
		edit: false,
		loading: false,
		success: false,
		errors: false,
	});

	var [getCreditsPrams, setgetCreditsPrams] = useState({
		adding: false,
		title: "",
		email: "public.nurhasan@gmail.com",
		domain: "",
		result: null,
		loading: false,
	}); // Using the hook.

	var [loading, setloading] = useState(false);
	var [selectedRows, setselectedRows] = useState([]);

	function fetchPosts() {
		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		console.log(queryPrams.type);

		var postData = {
			limit: queryPrams.limit,
			page: queryPrams.page,
			type: queryPrams.type,
		};
		postData = JSON.stringify(postData);
		setloading(true);

		fetch(appData.serverUrl + "wp-json/email-validation/v2/get_credits", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: postData,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Token validation failed");
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {
						var posts = res?.posts;
						var total = res?.total;
						var max_pages = res?.max_pages;

						setcreditsData({ posts: posts, total: total, maxPages: max_pages });
						setloading(false);

						setTimeout(() => { }, 500);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});
	}

	function createCredits() {
		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		if (queryPrams.page < 0) {
			return;
		}

		var postData = {
			amount: addCredits.amount,
			type: addCredits.type,
			source: addCredits.source,
			userid: addCredits.userid,
		};
		postData = JSON.stringify(postData);

		fetch(appData.serverUrl + "wp-json/email-validation/v2/create_credits", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: postData,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Token validation failed");
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {
						var errors = res?.errors;
						var success = res?.success;

						fetchPosts();

						setaddCredits({
							...addCredits,
							loading: false,
							errors: errors,
							success: success,
						});

						setTimeout(() => {
							setaddCredits({
								...addCredits,
								title: "",
								success: null,
								errors: null,
							});
						}, 3000);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});
	}

	function onSelectRows(rows) {
		setselectedRows(rows);
	}

	function deleteCredits(id) {
		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}
		var postData = {
			id: id,
		};
		postData = JSON.stringify(postData);

		fetch(appData.serverUrl + "wp-json/email-validation/v2/delete_credits", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: postData,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Token validation failed");
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {
						//console.log(res);

						setTimeout(() => { }, 500);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});
	}

	function deleteRow(id) {
		deleteCredits(id);
	}

	var columns = {
		check: { label: "Check" },
		// id: { label: "ID" },
		type: { label: "Type" },
		amount: { label: "Amount" },

		source: { label: "Source" },
		username: { label: "User name" },
		// userid: { label: "Userid" },
		// status: { label: "Status" },
		datetime: { label: "Datetime" },
	};

	// useEffect(() => {
	// 	fetchPosts();
	// }, []);

	useEffect(() => {
		fetchPosts();
	}, [queryPrams]);

	function onChangeQueryPrams(queryPrams) {
		if (queryPrams) {
			setqueryPrams(queryPrams);
			fetchPosts();
		}
	}
	function delete_credits() {
		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		// if (queryPrams.page < 0) {
		// 	return;
		// }

		var postData = {
			ids: selectedRows,
		};
		postData = JSON.stringify(postData);
		setloading(true);
		fetch(
			appData.serverUrl + "wp-json/email-validation/v2/delete_credits",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: postData,
			}
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Token validation failed");
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {
						var errors = res?.errors;
						var success = res?.success;

						setloading(false);

						fetchPosts();

						// setaddTask({ ...addTask, loading: false, errors: errors, success: success })

						// setTimeout(() => {
						// 	setaddTask({ ...addTask, title: "", success: null, errors: null })

						// }, 3000);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});
	}

	return (
		<Layout>
			<div>
				<div className=" p-4 ">



					<div className="flex gap-3 items-center justify-between">

						{userRoles?.includes("administrator") && (

							<>
								<div className="relative">
									<button
										className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer"
										onClick={(ev) => {
											setaddCredits({ ...addCredits, edit: !addCredits.edit });
										}}>
										Add
									</button>
									{addCredits.edit && (
										<Popover className="top-full left-0 min-w-[400px] mt-2 bg-white px-4 py-3 rounded-sm grid grid-cols-2 gap-4 border border-gray-400">
											<input
												type="text"
												placeholder="100"
												className="p-3 py-[5px]  bg-gray-400 border rounded-sm border-solid "
												value={addCredits?.amount}
												onChange={(ev) => {
													setaddCredits({ ...addCredits, amount: ev.target.value });
												}}
											/>
											<input
												type="text"
												placeholder="123"
												className="p-3 py-[5px]  bg-gray-400 border rounded-sm border-solid "
												value={addCredits?.userid}
												onChange={(ev) => {
													setaddCredits({ ...addCredits, userid: ev.target.value });
												}}
											/>
											<select
												name=""
												id=""
												className=" rounded-sm border-solid border-2 border-blue-500 py-[5px] px-2 cursor-pointer"
												value={addCredits?.type}
												onChange={(ev) => {
													setaddCredits({ ...addCredits, type: ev.target.value });
												}}>
												<option value="">Type..</option>
												<option value="credit">Credit</option>
												<option value="debit">Debit</option>
											</select>
											<select
												name=""
												id=""
												className=" rounded-sm border-solid border-2 border-blue-500 py-[5px] px-2 cursor-pointer"
												value={addCredits?.source}
												onChange={(ev) => {
													setaddCredits({ ...addCredits, source: ev.target.value });
												}}>
												<option value="">Source..</option>
												<option value="instant">Instant</option>
												<option value="daily">Daily</option>
												<option value="API">API</option>
												<option value="cron">Cron</option>
												<option value="monthly">Monthly</option>
												<option value="register">Register</option>
											</select>
											<button
												onClick={(ev) => {
													createCredits();
													setaddCredits({ ...addCredits, loading: true });
												}}
												className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer">
												Submit
											</button>
										</Popover>
									)}
								</div>

								<div>
									{addCredits.loading && <>Loading...</>}
									{addCredits.errors && <>There is an error.</>}
									{addCredits.success && <>Task Added.</>}
								</div>
							</>
						)}





						<div className="flex items-center gap-2">
							<select
								name=""
								id=""
								className=" rounded-sm border-solid border-2 border-blue-500 py-[5px] px-2 cursor-pointer"
								value={queryPrams?.type}
								onChange={(ev) => {
									setqueryPrams({ ...queryPrams, type: ev.target.value });
								}}>
								<option value="">Type..</option>
								<option value="credit">Credit</option>
								<option value="debit">Debit</option>
							</select>

							{selectedRows.length > 0 && (
								<div
									className="px-3 py-[5px] rounded-sm bg-red-600 hover:bg-red-500 text-white cursor-pointer"
									onClick={(ev) => {
										delete_credits();
									}}>
									Delete Credits
								</div>
							)}
						</div>

					</div>




					<div></div>
				</div>

				<EntriesTable
					// deleteRow={deleteRow}
					queryPrams={queryPrams}
					columns={columns}
					entries={creditsData}
					itemPath={""}
					onChange={onChangeQueryPrams}
					loading={loading}
					selectedRows={selectedRows}
					onSelectRows={onSelectRows}
				/>
			</div>
		</Layout>
	);
}

export default Credits;
