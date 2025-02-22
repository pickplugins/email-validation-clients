import Layout from "../components/Layout";
import { useState, useEffect, useContext } from "react";
import EntriesTable from "../components/EntriesTable";
import Spinner from "../components/Spinner";
import { IconRefresh } from "@tabler/icons-react";
import { AuthContext } from "../components/AuthContext";



function Spammers() {

	var [appData, setappData] = useState(window.appData);

	var [requestData, setrequestData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({ domain: "", keyword: "", page: 1, order: "DESC", limit: 10, first_date: "", last_date: "" });
	var [validateMailPrams, setvalidateMailPrams] = useState({ email: '', apikey: 'lWl6^EDwPUbLsrqwPz0&Ki2^VO1038#dqJ1Nf4Ss', testType: "", result: {}, loading: false });


	var [getApiKeyPrams, setgetApiKeyPrams] = useState({ adding: false, title: "", email: "public.nurhasan@gmail.com", domain: "", result: null, loading: false }); // Using the hook.

	var [loading, setloading] = useState(false);

	var [selectedRows, setselectedRows] = useState([]);
	var [domains, setdomains] = useState([]);

	const { t, token } = useContext(AuthContext);


	function onSelectRows(rows) {
		setselectedRows(rows);
	}

	function delete_validation() {
		// const token = localStorage.getItem("token");

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
		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}
		var postData = {
			limit: queryPrams.limit,
			page: queryPrams.page,
		};
		postData = JSON.stringify(postData);
		setloading(true);

		fetch(appData.serverUrl + "wp-json/email-validation/v2/get_spammers", {
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

						setdomains(posts);
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

	function fetchDomains() {
		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}
		var postData = {
			limit: queryPrams.limit,
			page: queryPrams.page,
		};
		postData = JSON.stringify(postData);
		setloading(true);

		fetch(appData.serverUrl + "wp-json/email-validation/v2/get_spammer_domains", {
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
		// const token = localStorage.getItem("token");

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
			label: t("Status"),
			value: "status",
		},
		safeToSend: {
			label: t("Safe To Send"),
			value: "safeToSend",
		},
		isFreeEmailProvider: {
			label: t("Free Email Provider"),
			value: "isFreeEmailProvider",
		},
		isInboxFull: {
			label: t("Inbox Full"),
			value: "isInboxFull",
		},
		isGibberishEmail: {
			label: t("Gibberish Email"),
			value: "isGibberishEmail",
		},
		isSMTPBlacklisted: {
			label: t("SMTP Blacklisted"),
			value: "isSMTPBlacklisted",
		},
		isDisposableDomain: {
			label: t("Disposable Domain"),
			value: "isDisposableDomain",
		},
		isCatchAllDomain: {
			label: t("Catch All Domain"),
			value: "isCatchAllDomain",
		},
		isSyntaxValid: {
			label: t("Syntax Valid"),
			value: "isSyntaxValid",
		},
		isValidEmail: {
			label: t("Valid Email"),
			value: "isValidEmail",
		},
		hasValidDomain: {
			label: t("Has Valid Domain"),
			value: "hasValidDomain",
		},
		isRoleBasedEmail: {
			label: t("Role Based Email"),
			value: "isRoleBasedEmail",
		},
		verifySMTP: {
			label: t("Verify SMTP"),
			value: "verifySMTP",
		},
		checkDomainReputation: {
			label: t("Domain Reputation"),
			value: "checkDomainReputation",
		},
	};

	var columns = {
		// id: { label: t("ID") },
		email: { label: t("Email") },
		report_count: { label: t("Report count") },
		domains: { label: t("Domains") },
		level: { label: t("Level") },
		last_date: { label: t("Last date") },
		// datetime: { label: t("Datetime") },
	};

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
							{t("Delete Items")}
						</div>
					)}

					<button
						onClick={() => {
							fetchPosts();
						}}
						className="">
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


			</div>
		</Layout>
	);
}

export default Spammers;


