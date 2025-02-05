import Layout from "../components/Layout";
import { useState, useEffect } from "react";



function ValidationRequests() {


	var [requestData, setrequestData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({ page: 1, limit: 12, first_date: "", last_date: "" });
	var [validateMailPrams, setvalidateMailPrams] = useState({ email: '', apikey: 'lWl6^EDwPUbLsrqwPz0&Ki2^VO1038#dqJ1Nf4Ss', testType: "", result: {} });


	var [getApiKeyPrams, setgetApiKeyPrams] = useState({ adding: false, title: "", email: "public.nurhasan@gmail.com", domain: "", result: null, loading: false }); // Using the hook.



	function fetchPosts() {

		var postData = {
			limit: queryPrams.limit,
			page: queryPrams.page,
		};
		postData = JSON.stringify(postData);

		fetch("http://localhost/wordpress/wp-json/email-validation/v2/validation_requests", {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: postData,
		})
			.then((response) => {
				if (response.ok && response.status < 400) {
					response.json().then((res) => {

						var posts = res?.posts;


						console.log(res);
						setrequestData(posts)

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

		var postData = {
			email: validateMailPrams.email,
			apikey: validateMailPrams.apikey,
		};
		postData = JSON.stringify(postData);

		fetch("http://localhost/wordpress/wp-json/email-validation/v2/check_email", {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: postData,
		})
			.then((response) => {
				if (response.ok && response.status < 400) {
					response.json().then((res) => {
						console.log(res);

						//var result = JSON.parse(res);
						setvalidateMailPrams({ ...validateMailPrams, result: res })

						var requestDataX = [...requestData]

						requestDataX.push({
							"id": "...",
							"apikeyid": "...",
							"email": validateMailPrams.email,
							"result": JSON.stringify(res)
						})
						//setrequestData(posts)

						setrequestData(requestDataX)

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




	return (
		<Layout>
			<div>
				<div className="flex justify-between bg-gray-200 p-4 mb-5">

					<div>Validation Requests</div>

					<div></div>

				</div>

				{JSON.stringify(validateMailPrams)}


				<div><table className="table-fixed w-full text-center border-collapse">

					<thead>
						<tr className="bg-gray-300 border border-solid border-gray-200">
							<th className=" px-5 py-2 w-20">ID</th>
							<th className=" px-5 py-2">Email							</th>
							<th className=" px-5 py-2">Status</th>
							<th className=" px-5 py-2">Date</th>
						</tr>

					</thead>

					{requestData?.map((item, index) => {

						var result = JSON.parse(item.result);

						console.log(result);
						console.log(result.status);
						return (
							<tbody key={index}>
								<tr className="border-0 border-b border-solid border-gray-200">
									<td className=" px-5 py-2">{item.id}</td>
									<td className=""> {item.email}</td>
									<td className=""> {result.status.join(", ")}</td>
									<td className=""> {item.datetime}</td>
								</tr>


							</tbody>
						);
					})}
				</table></div>


				<div className="my-4 flex gap-3">


					<div className="p-3 py-2 bg-gray-600 text-white cursor-pointer" onClick={ev => {
						console.log("Hello 1");
						setqueryPrams({ ...queryPrams, page: queryPrams.page - 1 })

					}} >Previous</div>
					<div className="p-3 py-2 bg-gray-600 text-white cursor-pointer" onClick={ev => {
						console.log("Hello 2");
						setqueryPrams({ ...queryPrams, page: queryPrams.page + 1 })

					}}>Next</div>

				</div>

				<div>

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


