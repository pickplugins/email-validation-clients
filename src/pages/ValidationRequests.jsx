import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import EntriesTable from "../components/EntriesTable";
import Spinner from "../components/Spinner";
import { IconRefresh } from "@tabler/icons-react";



function ValidationRequests() {

	var [appData, setappData] = useState(window.appData);

	var [requestData, setrequestData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", limit: 10, first_date: "", last_date: "" });
	var [validateMailPrams, setvalidateMailPrams] = useState({ email: '', apikey: 'lWl6^EDwPUbLsrqwPz0&Ki2^VO1038#dqJ1Nf4Ss', testType: "", result: {}, loading: false });


	var [getApiKeyPrams, setgetApiKeyPrams] = useState({ adding: false, title: "", email: "public.nurhasan@gmail.com", domain: "", result: null, loading: false }); // Using the hook.

	var [loading, setloading] = useState(false);

	var [selectedRows, setselectedRows] = useState([]);


	function onSelectRows(rows) {
		setselectedRows(rows);
	}

	function delete_validation() {
		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		if (queryPrams.page < 0) {
			return;
		}

		var postData = {
			ids: selectedRows,
		};
		postData = JSON.stringify(postData);
		setloading(true);
		fetch(appData.serverUrl + "wp-json/email-validation/v2/delete_validation", {
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


	function fetchPosts() {
		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}
		var postData = {
			limit: queryPrams.limit,
			page: queryPrams.page,
		};
		postData = JSON.stringify(postData);
		setloading(true);

		fetch(appData.serverUrl + "wp-json/email-validation/v2/validation_requests", {
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


						var posts = res?.posts;
						var total = res?.total;
						var max_pages = res?.max_pages;

						setrequestData({ posts: posts, total: total, maxPages: max_pages })
						setloading(false);

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

	function validateEmail() {
		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}
		var postData = {
			email: validateMailPrams.email,
			apikey: validateMailPrams.apikey,
		};
		postData = JSON.stringify(postData);
		setvalidateMailPrams({ ...validateMailPrams, loading: true })

		fetch(appData.serverUrl + "wp-json/email-validation/v2/validate_email_by_user", {
			method: "POST",
			mode: "cors",
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

						//var result = JSON.parse(res);
						setvalidateMailPrams({ ...validateMailPrams, result: res, loading: false })



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







	// useEffect(() => {
	// 	fetchPosts();
	// }, []);

	useEffect(() => {
		fetchPosts();
	}, [queryPrams]);



	var validationPrams = {


		status: {
			"label": "Status",
			"value": "status"
		},

		safeToSend: {
			"label": "Safe To Send",
			"value": "safeToSend"
		},
		isFreeEmailProvider: {
			"label": "Free Email Provider",
			"value": "isFreeEmailProvider"
		},
		isInboxFull: {
			"label": "Inbox Full",
			"value": "isInboxFull"
		},
		isGibberishEmail: {
			"label": "Gibberish Email",
			"value": "isGibberishEmail"
		},
		isSMTPBlacklisted: {
			"label": "SMTP Blacklisted",
			"value": "isSMTPBlacklisted"
		},
		isDisposableDomain: {
			"label": "Disposable Domain",
			"value": "isDisposableDomain"
		},


		isCatchAllDomain: {
			"label": "Catch All Domain",
			"value": "isCatchAllDomain"
		},
		isSyntaxValid: {
			"label": "Syntax Valid",
			"value": "isSyntaxValid"
		},
		isValidEmail: {
			"label": "Valid Email",
			"value": "isValidEmail"
		},
		hasValidDomain: {
			"label": "Has Valid Domain",
			"value": "hasValidDomain"
		},
		isRoleBasedEmail: {
			"label": "Role Based Email",
			"value": "isRoleBasedEmail"
		},
		verifySMTP: {
			"label": "Verify SMTP",
			"value": "verifySMTP"
		},
		checkDomainReputation: {
			"label": "Domain Reputation",
			"value": "checkDomainReputation"
		},
	}

	var columns = {
		id: { label: "ID" },
		username: { label: "User Name" },
		email: { label: "Email" },
		// apikeyid: { label: "API key" },
		result: { label: "Result" },
		datetime: { label: "Datetime" },
	}
	function onChangeQueryPrams(queryPrams) {
		if (queryPrams) {
			setqueryPrams(queryPrams)
			fetchPosts();
		}

	}

	return (
		<Layout>
			<div>
				<div className="flex w-full md:justify-end p-4">
					{selectedRows.length > 0 && (
						<div
							className="px-3 py-[5px] rounded-sm bg-red-600 hover:bg-red-500 text-white cursor-pointer"
							onClick={() => {
								delete_validation();
							}}>
							Delete Items
						</div>
					)}

					<button
						onClick={() => {
							fetchPosts();
						}}
						className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer">
						<IconRefresh />
					</button>
				</div>
				<EntriesTable
					queryPrams={queryPrams}
					columns={columns}
					entries={requestData}
					itemPath={""}
					onChange={onChangeQueryPrams}
					loading={loading}
					selectedRows={selectedRows}
					onSelectRows={onSelectRows}
				/>

				<div className="p-5">
					<div className="my-5 text-2xl font-bold">Single Validation</div>

					<div className="flex gap-2 items-center">
						<input
							type="email"
							className="bg-gray-200 px-2 py-[5px] border border-solid rounded-sm"
							value={validateMailPrams.email}
							onChange={(ev) => {
								setvalidateMailPrams({
									...validateMailPrams,
									email: ev.target.value,
								});
							}}
						/>
						<button
							className="p-3 py-[5px] bg-gray-600 text-white cursor-pointer rounded-sm"
							onClick={(ev) => {
								validateEmail();
							}}>
							Validate
						</button>
					</div>

					{validateMailPrams.loading && <>Loading...</>}

					{validateMailPrams.result != null && (
						<>
							<table className="table-fixed border-collapse my-5">
								<tbody>
									{Object.entries(validateMailPrams.result).map((args) => {
										var id = args[0];
										var value = args[1];

										// console.log(args);

										return (
											<>
												{validationPrams[id] != undefined && (
													<>
														<tr className=" " key={id}>
															<td className="w-[250px] py-4 border-0 border-b border-solid border-gray-400">
																{validationPrams[id]?.label}
															</td>
															<td className="w-[250px] py-4  border-0 border-b border-solid border-gray-400">
																<div className="flex items-center">
																	{id == "status" && (
																		<>{JSON.stringify(value)}</>
																	)}
																	{id == "safeToSend" && (
																		<>
																			{value != "yes" && <> No</>}
																			{value == "yes" && <> Yes</>}
																		</>
																	)}

																	{id == "isGibberishEmail" && (
																		<>
																			{value != "yes" && <> No</>}
																			{value == "yes" && <> Yes</>}
																		</>
																	)}
																	{id == "isSMTPBlacklisted" && (
																		<>
																			{value != "yes" && <> No</>}
																			{value == "yes" && <> Yes</>}
																		</>
																	)}

																	{(id == "isSyntaxValid" ||
																		id == "hasValidDomain" ||
																		id == "isDisposableDomain" ||
																		id == "isFreeEmailProvider" ||
																		id == "checkDomainReputation" ||
																		id == "isRoleBasedEmail" ||
																		id == "isCatchAllDomain" ||
																		id == "verifySMTP" ||
																		id == "isInboxFull" ||
																		id == "isValidEmail") && (
																			<>
																				{value == "yes" && <> No</>}
																				{value != "yes" && <> Yes</>}
																			</>
																		)}
																</div>
															</td>
														</tr>
													</>
												)}
											</>
										);
									})}
								</tbody>
							</table>
						</>
					)}
				</div>
			</div>
		</Layout>
	);
}

export default ValidationRequests;


