import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import EntriesTable from "../components/EntriesTable";



function ApiKeys() {

	var [appData, setappData] = useState(window.appData);

	var [apiKeysData, setapiKeysData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", limit: 10, first_date: "", last_date: "" });

	var [addApiKey, setaddApiKey] = useState({ title: "", edit: false, loading: false, success: false, errors: false });


	var [getApiKeyPrams, setgetApiKeyPrams] = useState({ adding: false, title: "", email: "public.nurhasan@gmail.com", domain: "", result: null, loading: false }); // Using the hook.

	var [loading, setloading] = useState(false);


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



	function createApiKey() {

		const token = localStorage.getItem("token");

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

						setaddApiKey({ ...addApiKey, loading: false, errors: errors, success: success })

						setTimeout(() => {
							setaddApiKey({ ...addApiKey, title: "", success: null, errors: null })

						}, 3000);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});

	}


	function deleteApiKey(id) {
		const token = localStorage.getItem("token");

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

	function deleteRow(id) {
		//console.log(id);
		deleteApiKey(id)
	}

	var columns = {
		id: { label: "ID" },
		title: { label: "Title" },
		apikey: { label: "API key" },
		status: { label: "Status" },
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



	return (
		<Layout>
			<div>


				<div className="flex justify-between p-4 ">

					<div className="flex gap-3 items-center">
						<div className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer" onClick={ev => {
							setaddApiKey({ ...addApiKey, edit: !addApiKey.edit })
						}}>Add</div>

						{addApiKey.edit && (
							<>
								<input type="text" placeholder="API Title" className="p-3 py-[5px] bg-gray-400 border rounded-sm border-solid " value={addApiKey?.title} onChange={ev => {
									setaddApiKey({ ...addApiKey, title: ev.target.value })

								}} />

								<div onClick={ev => {
									createApiKey();
									setaddApiKey({ ...addApiKey, loading: true })

								}} className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer" >Submit</div>
							</>
						)}

						{addApiKey.loading && (
							<>Loading...</>
						)}
						{addApiKey.errors && (
							<>There is an error.</>
						)}
						{addApiKey.success && (
							<>Task Added.</>
						)}

					</div>



					<div></div>
				</div>


				<EntriesTable deleteRow={deleteRow} queryPrams={queryPrams} columns={columns} entries={apiKeysData} itemPath={"orders"} onChange={onChangeQueryPrams} loading={loading} />



			</div>
		</Layout>
	);
}

export default ApiKeys;


