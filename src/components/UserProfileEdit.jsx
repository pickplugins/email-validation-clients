import { useLocation } from "react-router-dom";
import UserAccount from "../components/UserAccount";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import Spinner from "./Spinner";
import ToggleContent from "./ToggleContent";


const UserProfileEdit = ({ user }) => {

	const { token, userData, t } = useContext(AuthContext);
	// var [userData, setuserData] = useState(user);
	var [editUserData, seteditUserData] = useState({ apiKeys: null });

	const [loading, setloading] = useState(false);

	console.log(editUserData);


	function updateUserProfile() {
		setloading(true);

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



						seteditUserData({ ...res })


console.log(res)
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

	const apiKeysPrams = {

		dropbox: {
			id: "dropbox",
			label: "Dropbox",
			args: {
				accessToken: "",
			},
			isPro: true,
		},
		googleDrive: {
			id: "googleDrive",
			label: "Google Drive",
			args: {
				accessToken: "",
			},
			isPro: true,
		},


		airtable: {
			id: "airtable",
			label: "Airtable",
			args: {
				accessToken: "",
			},
			isPro: true,
		},

		zendesk: {
			id: "zendesk",
			label: "Zendesk",
			args: {
				apiToken: "",
				subdomain: "",
				email: "",
			},
			isPro: true,
		},
		twilio: {
			id: "twilio",
			label: "Twilio",
			args: {
				authToken: "",
				accountSid: "",
				phoneNumber: "",
				text: "",
			},
			isPro: true,
		},


		openAI: {
			id: "openAI",
			label: "openAI",
			args: {
				apikey: "",
				model: "",
			},
			isPro: true,

		},
		acumbamail: {
			id: "acumbamail",
			label: "Acumbamail",
			args: {
				apikey: "",
				authToken: "",
			},
			isPro: true,
		},
		brevo: {
			id: "brevo",
			label: "Brevo",
			args: {
				apikey: "",
			},
			isPro: true,
		},
		omnisend: {
			id: "omnisend",
			label: "Omnisend",
			args: {
				apikey: "",
			},
			isPro: true,
		},
		klaviyo: {
			id: "klaviyo",
			label: "Klaviyo",
			args: {
				apikey: "",
			},
			isPro: true,
		},
		// aweber: {
		// 	id: "aweber",
		// 	label: "Aweber API",
		// 	args: {
		// 		accountId: "",
		// 		accessToken: "",
		// 	},
		// },
		mailerlite: {
			id: "mailerlite",
			label: "Mailer Lite",
			args: {
				apikey: "",
			},
			isPro: true,
		},
		emailoctopus: {
			id: "emailoctopus",
			label: "Email Octopus",
			args: {
				apikey: "",
			},
			isPro: true,
		},
		sender: {
			id: "sender",
			label: "Sender",
			args: {
				apikey: "",
			},
			isPro: true,
		},

		// constantcontact: {
		// 	id: "constantcontact",
		// 	label: "Constant Contact",
		// 	args: {
		// 		accessToken: "",
		// 	},
		// 	isPro: true,
		// },
		// getresponse: {
		// 	id: "getresponse",
		// 	label: "Get Response",
		// 	args: {
		// 		apikey: "",
		// 	},
		// 	isPro: true,
		// },
		// drip: {
		// 	id: "drip",
		// 	label: "Drip",
		// 	args: {
		// 		accountId: "",
		// 		apikey: "",
		// 	},
		// 	isPro: true,
		// },
		mailmodo: {
			id: "mailmodo",
			label: "mailmodo",
			args: {
				apikey: "",
			},
			isPro: true,
		},
		moosend: {
			id: "moosend",
			label: "Moo Send",
			args: {
				apikey: "",
			},
			isPro: true,
		},
		// hubspot: {
		// 	id: "hubspot",
		// 	label: "Hub Spot",
		// 	args: {
		// 		apikey: "",
		// 	},
		// 	isPro: true,
		// },
		mailjet: {
			id: "mailjet",
			label: "Mailjet",
			args: {
				apikeyPublic: "",
				apikeyPrivate: "",
			},
			isPro: true,
		},
		// mailgun: {
		// 	id: "mailgun",
		// 	label: "Mailgun",
		// 	args: {
		// 		username: "",
		// 		pass: "",
		// 	},
		// 	isPro: true,
		// },
		// convertkit: {
		// 	id: "convertkit",
		// 	label: "Convert Kit",
		// 	args: {
		// 		apikey: "",
		// 		apiSecret: "",
		// 	},
		// 	isPro: true,
		// },
		// elasticemail: {
		// 	id: "elasticemail",
		// 	label: "Elastice Mail",
		// 	args: {
		// 		apikey: "",
		// 	},
		// 	isPro: true,
		// },
		// sendgrid: {
		// 	id: "sendgrid",
		// 	label: "Send Grid",
		// 	args: {
		// 		apikey: "",
		// 	},
		// 	isPro: true,
		// },
		// mailchimp: {
		// 	id: "mailchimp",
		// 	label: "Mail Chimp",
		// 	args: {
		// 		apikey: "",
		// 		dc: "",
		// 	},
		// 	isPro: true,
		// },
		// activecampaign: {
		// 	id: "activecampaign",
		// 	label: "Active Campaign",
		// 	args: {
		// 		apikey: "",
		// 		accountName: "",
		// 	},
		// 	isPro: true,
		// },
		// zoho: {
		// 	id: "zoho",
		// 	label: "Zoho",
		// 	args: {
		// 		apikey: "",
		// 	},
		//isPro: true
		// },
		// netcore: {
		// 	id: "netcore",
		// 	label: "Net Core",
		// 	args: {
		// 		apikey: "",
		// 	},
		//isPro: true
		// },
		// postman: {
		// 	id: "postman",
		// 	label: "Postman",
		// 	args: {
		// 		apikey: "",
		// 	},
		//isPro: true
		// },
	};


	return (
		<div className="">
			<div className="">
				<div className="grid md:grid-cols-12 gap-5">
					<div className="md:col-span-8 bg-white rounded-sm">
						<form action="" className="p-5">
							<h3 className="mb-5 text-2xl">{t("General Information")}</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div className="">
									<label htmlFor="" className="block">
										{t("First Name")}
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
										{t("Last Name")}
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
										{t("Email")}
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
										{t("Phone")}
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
										{t("Address 1")}
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
										{t("Address 2")}
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
										{t("Zip Code")}
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
										{t("City")}
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
										{t("Country")}
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
								<button
									type="submit"
									onClick={(ev) => {
										ev.preventDefault();

										updateUserProfile();
									}}
									className="p-2 flex items-center gap-2 hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white"
								>{t("Update")}
								{loading && (
									<Spinner />
								)}
								</button>
							</div>
						</form>
					</div>
					<div className="md:col-span-4 bg-white rounded-sm p-5">
						<h3 className="mb-5 text-2xl">{t("Change Password")}</h3>
						<form className="grid grid-cols-1 gap-8">
							<div>
								<label htmlFor="" className="block">
									{t("Current Password")}
								</label>
								<input
									type="password"
									className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200"
								/>
							</div>
							<div>
								<label htmlFor="" className="block">
									{t("New Password")}
								</label>
								<input
									type="password"
									className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200"
								/>
							</div>
							<div>
								<label htmlFor="" className="block">
									{t("Confirm Password")}
								</label>
								<input
									type="password"
									className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200"
								/>
							</div>
							<input
								type="submit"
								value={t("Update")}
								onClick={(ev) => {
									ev.preventDefault();

									updateUserPassword();
								}}
								className="p-2 hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white"
							/>
						</form>


						<div className="my-5">
							<h3 className="mb-5 text-2xl">{t("API Keys")}</h3>

							<select name="" id="" className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200 mb-5" onChange={ev => {

								var value = ev.target.value;
								console.log(value);

								var apiKeys = editUserData.apiKeys;
								var args = apiKeysPrams[value].args

								console.log(args)
								console.log(args)

								if (apiKeys == undefined) {
									apiKeys = {}
								}
								if (apiKeys[value] == undefined) {
									apiKeys[value] = {}
								}

								apiKeys[value] = args

								seteditUserData({ ...editUserData, apiKeys: apiKeys });



							}}>

								{Object.entries(apiKeysPrams).map(args => {

									var key = args[1]

									return (
										<option key={key.id} value={key.id}>{key.label}</option>
									)

								})}

							</select>



							{editUserData?.apiKeys != undefined && Object.entries(editUserData?.apiKeys).map(args => {

								var pramId = args[0]
								var pram = args[1]

								return (
									<ToggleContent key={pramId} title={apiKeysPrams[pramId]?.label}>

										<div>


											{pram && Object.entries(pram).map(([item, value], i) => {
												return (
													<div
														className="pg-setting-input-text   mb-4"
														key={i}>
														<label
															htmlFor=""
															className="font-medium text-slate-900  block">
															{item === "apikey" && <>{t("API Key")}</>}
															{item === "apiSecret" && (
																<>{t("API Secret")}</>
															)}
															{item === "username" && <>{t("UserName")}</>}
															{item === "accountName" && (
																<>{t("Account Name")}</>
															)}
															{item === "pass" && <>{t("Password")}</>}
															{item === "accountId" && (
																<>{t("Account Id")}</>
															)}
															{item === "subscriberId" && (
																<>{t("Subscriber Id")}</>
															)}
															{item === "listId" && <>{t("List Id")}</>}
															{item === "apiToken" && <>{t("API Token")}</>}
															{item === "subdomain" && <>{t("Subdomain")}</>}
															{item === "phoneNumber" && <>{t("Phone Number")}</>}
															{item === "accountSid" && <>{t("Account Sid")}</>}
															{item === "authToken" && <>{t("Auth Token")}</>}
															{item === "email" && <>{t("Email")}</>}
															{item === "accessToken" && (
																<>{t("Access Token")}</>
															)}
															{item === "campaignId" && (
																<>{t("Campaign Id")}</>
															)}
															{item === "apikeyPrivate" && (
																<>{t("Private Api Key")}</>
															)}
															{item === "apikeyPublic" && (
																<>{t("Public Api Key")}</>
															)}
															{item === "site_key" && <>{t("Site Key")}</>}
															{item === "dc" && <>{t("DC")}</>}
															{item === "secret_key" && (
																<>{t("Secret Key")}</>
															)}
															{item === "model" && <>{t("Model")}</>}
														</label>

														<input type="text" value={editUserData.apiKeys[pramId][item]} className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-gray-200" onChange={ev => {
															var value = ev.target.value;
															seteditUserData({ ...editUserData, apiKeys: { ...editUserData.apiKeys, [pramId]: { ...editUserData.apiKeys[pramId], [item]: value } } });
														}} />
													</div>
												);
											})}

										</div>

									</ToggleContent>
								)

							})}


						</div>

					</div>
				</div>
			</div>
		</div>
	);
}

export default UserProfileEdit