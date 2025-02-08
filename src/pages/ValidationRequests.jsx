import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import EntriesTable from "../components/EntriesTable";



function ValidationRequests() {

	var [appData, setappData] = useState(window.appData);

	var [requestData, setrequestData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", limit: 10, first_date: "", last_date: "" });
	var [validateMailPrams, setvalidateMailPrams] = useState({ email: '', apikey: 'lWl6^EDwPUbLsrqwPz0&Ki2^VO1038#dqJ1Nf4Ss', testType: "", result: {} });


	var [getApiKeyPrams, setgetApiKeyPrams] = useState({ adding: false, title: "", email: "public.nurhasan@gmail.com", domain: "", result: null, loading: false }); // Using the hook.



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

		fetch(appData.serverUrl + "wp-json/email-validation/v2/check_email", {
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

						//var result = JSON.parse(res);
						setvalidateMailPrams({ ...validateMailPrams, result: res })



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
		email: { label: "Email" },
		status: { label: "Status" },
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

				<EntriesTable queryPrams={queryPrams} columns={columns} entries={requestData} itemPath={"orders"} onChange={onChangeQueryPrams} />





				<div className="p-5">

					<div className="flex gap-2 items-center">
						<input type="email"
							className="bg-gray-200 px-2 py-2 border border-solid rounded-sm"
							value={validateMailPrams.email} onChange={ev => {
								setvalidateMailPrams({ ...validateMailPrams, email: ev.target.value })
							}} />
						<div
							className="p-3 py-2 bg-gray-600 text-white cursor-pointer"
							onClick={ev => {
								validateEmail()
							}}>Validate</div>
					</div>


					{validateMailPrams.result != null && (

						<>
							<table className="table-fixed border-collapse">
								<tbody>
									{Object.entries(validateMailPrams.result).map(args => {
										var id = args[0]
										var value = args[1]

										// console.log(args);

										return (
											<>
												{validationPrams[id] != undefined && (
													<>
														<tr className=" ">
															<td className="w-[250px] py-4 border-0 border-b border-solid border-gray-400">{validationPrams[id]?.label}</td>
															<td className="w-[250px] py-4  border-0 border-b border-solid border-gray-400">

																<div className="flex items-center">



																	{id == "status" && (
																		<>
																			{JSON.stringify(value)}

																		</>
																	)}
																	{id == "safeToSend" && (
																		<>
																			{value != 'yes' && (
																				<> No</>
																			)}
																			{value == 'yes' && (
																				<> Yes</>
																			)}
																		</>
																	)}



																	{id == "isGibberishEmail" && (
																		<>
																			{!value && (
																				<> No</>
																			)}
																			{value && (
																				<> Yes</>
																			)}
																		</>
																	)}
																	{id == "isSMTPBlacklisted" && (
																		<>
																			{!value && (
																				<> No</>
																			)}
																			{value && (
																				<> Yes</>
																			)}
																		</>
																	)}



																	{(
																		id == "isSyntaxValid" ||
																		id == "hasValidDomain" ||
																		id == "isDisposableDomain" ||
																		id == "isFreeEmailProvider" ||
																		id == "checkDomainReputation" ||
																		id == "isRoleBasedEmail" ||
																		id == "isCatchAllDomain" ||
																		id == "verifySMTP" ||
																		id == "isInboxFull" ||
																		id == "isValidEmail"
																	)
																		&& (
																			<>
																				{value && (
																					<> Yes</>
																				)}
																				{!value && (
																					<> No</>
																				)}
																			</>
																		)}

																</div>

															</td>
														</tr>
													</>
												)}

											</>
										)

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


