import Layout from "../components/Layout";
import { useState, useEffect, useContext } from "react";
import EntriesTable from "../components/EntriesTable";
import { AuthContext } from "../components/AuthContext";
import Popover from "../components/Popover";
import { IconCopy, IconX } from "@tabler/icons-react";



function ApiKeys() {

	var [appData, setappData] = useState(window.appData);
	const { token } = useContext(AuthContext);

	var [apiKeysData, setapiKeysData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", limit: 10, first_date: "", last_date: "" });

	var [addApiKey, setaddApiKey] = useState({ title: "", edit: false, loading: false, success: false, errors: false });


	var [getApiKeyPrams, setgetApiKeyPrams] = useState({ adding: false, title: "", email: "public.nurhasan@gmail.com", domain: "", result: null, loading: false }); // Using the hook.

	var [loading, setloading] = useState(false);

	var [selectedRows, setselectedRows] = useState([]);


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

		fetch(appData.serverUrl + "wp-json/email-validation/v2/get_api_keys", {
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

						setapiKeysData({ posts: posts, total: total, maxPages: max_pages })
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

	const [popup, setpopup] = useState(null);

	function createApiKey() {

		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}


		if (queryPrams.page < 0) {
			return;
		}

		var postData = {
			title: addApiKey.title,
		};
		postData = JSON.stringify(postData);

		fetch(appData.serverUrl + "wp-json/email-validation/v2/create_api_key", {
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

						var errors = res?.errors;
						var success = res?.success;


						console.log(res);
						fetchPosts()

						setaddApiKey({ ...addApiKey, title: "", loading: false, errors: errors, success: success })

						setpopup({
							title: "API Key",
							message: "API key created.",
							apikey: res?.apikey,
							display: true
						});
						// setTimeout(() => {
						// 	// setaddApiKey({ ...addApiKey, title: "", success: null, errors: null })

						// }, 3000);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});

	}


	function deleteApiKey(id) {
		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}
		var postData = {
			id: id,
		};
		postData = JSON.stringify(postData);

		fetch(appData.serverUrl + "wp-json/email-validation/v2/delete_api_key", {
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



						//console.log(res);

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

	function delete_tasks_entries() {
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
		fetch(
			appData.serverUrl + "wp-json/email-validation/v2/delete_api_entries",
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

	function deleteRow(id) {
		//console.log(id);
		deleteApiKey(id)
	}

	var columns = {
		check: { label: "Check" },
		// id: { label: "ID" },
		title: { label: "Title" },
		apikey: { label: "API key" },
		status: { label: "Status" },
		username: { label: "User name" },
		datetime: { label: "Datetime" },
	}



	// useEffect(() => {
	// 	fetchPosts();
	// }, []);

	useEffect(() => {
		fetchPosts();
	}, [queryPrams]);


	function onChangeQueryPrams(queryPrams) {
		if (queryPrams) {
			setqueryPrams(queryPrams)
			fetchPosts();
		}

	}

	function onSelectRows(rows) {
		// console.log(rows);
		setselectedRows(rows);
	}


	return (
		<Layout>
			<div className="relative">
				{popup && popup.display && (
					<Popover className="fixed inset-0 flex items-center justify-center ">
						<div className="bg-white p-6 shadow-lg rounded-sm relative border-2 border-blue-400">
							<IconX className="absolute top-3 right-3 cursor-pointer hover:rotate-90 hover:text-red-500 transition-all duration-300" onClick={() => {
								setpopup({ ...popup, apikey: "", display: false })
							}} />
							<h2 className="text-2xl mb-5">API key created.</h2>
							<span className="flex items-center gap-3 px-3 py-2 border border-gray-200"><span className="">{popup?.apikey}</span>
								<IconCopy className="cursor-pointer hover:text-blue-500 transition-all duration-300" onClick={() => {
									navigator.clipboard.writeText(popup?.apikey)
								}} />
							</span>
						</div>
					</Popover>
				)}
				<div className=" p-4 ">
					<div className="flex gap-3 items-center justify-between">
						<div className="flex gap-3 items-center">
							<button
								className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer"
								onClick={(ev) => {
									setaddApiKey({ ...addApiKey, edit: !addApiKey.edit });
								}}>
								Add
							</button>
							{addApiKey.edit && (
								<>
									<input
										type="text"
										placeholder="API Title"
										className="p-3 py-[5px] bg-gray-400 border rounded-sm border-solid "
										value={addApiKey?.title}
										onChange={(ev) => {
											setaddApiKey({ ...addApiKey, title: ev.target.value });
										}}
									/>
									<button
										onClick={(ev) => {
											createApiKey();
											setaddApiKey({ ...addApiKey, loading: true });
										}}
										className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer">
										Submit
									</button>
								</>
							)}
						</div>

						{addApiKey.loading && <>Loading...</>}
						{addApiKey.errors && <>There is an error.</>}
						{addApiKey.success && <>Task Added.</>}
						{selectedRows.length > 0 && (
							<div
								className="px-3 py-[5px] rounded-sm bg-red-600 hover:bg-red-500 text-white cursor-pointer"
								onClick={(ev) => {
									delete_tasks_entries();
								}}>
								Delete API
							</div>
						)}
					</div>

					<div></div>
				</div>

				{/* <EntriesTable deleteRow={deleteRow} queryPrams={queryPrams} columns={columns} entries={apiKeysData} itemPath={""} onChange={onChangeQueryPrams} loading={loading} /> */}
				<EntriesTable
					queryPrams={queryPrams}
					columns={columns}
					entries={apiKeysData}
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

export default ApiKeys;


