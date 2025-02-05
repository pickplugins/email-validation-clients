import Layout from "../components/Layout";
import { useState, useEffect } from "react";



function ApiKeys() {


	var [apiKeysData, setapiKeysData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({ page: 1, limit: 12, first_date: "", last_date: "" });


	var [getApiKeyPrams, setgetApiKeyPrams] = useState({ adding: false, title: "", email: "public.nurhasan@gmail.com", domain: "", result: null, loading: false }); // Using the hook.



	function fetchPosts() {

		var postData = {
			limit: queryPrams.limit,
			page: queryPrams.page,
		};
		postData = JSON.stringify(postData);

		fetch("http://localhost/wordpress/wp-json/email-validation/v2/get_api_keys", {
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
						setapiKeysData(posts)

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

		var postData = {
			email: getApiKeyPrams.limit,
		};
		postData = JSON.stringify(postData);

		fetch("http://localhost/wordpress/wp-json/email-validation/v2/create_api_key", {
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


	function deleteApiKey(id) {

		var postData = {
			id: id,
		};
		postData = JSON.stringify(postData);

		fetch("http://localhost/wordpress/wp-json/email-validation/v2/delete_api_key", {
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






	return (
		<Layout>
			<div>
				<div className="flex justify-between bg-gray-200 p-4 mb-5">

					<div>API Keys</div>
					<div>
						<div className="p-3 py-2 bg-gray-600 text-white cursor-pointer" onClick={ev => {
							createApiKey()
						}}>Create API Key</div>
					</div>

				</div>


				<table className="table-fixed w-full text-center border-collapse">

					<thead>
						<tr className="bg-gray-300 border border-solid border-gray-200">
							<th className=" px-5 py-2 w-30">ID</th>
							<th className=" px-5 py-2 w-30">Title</th>
							<th className=" px-5 py-2">Key</th>
							<th className=" px-5 py-2">Status</th>
							<th className=" px-5 py-2">Date</th>
							<th className=" px-5 py-2"></th>
						</tr>

					</thead>

					{apiKeysData?.map((item, index) => {
						return (
							<tbody key={index}>
								<tr className="border-0 border-b border-solid border-gray-200">
									<td className=" px-5 py-2">{item.id}</td>
									<td className=""> {item.title}</td>
									<td className=""> {item.apikey}</td>
									<td className=""> {item.status}</td>


									<td className=""> {item.datetime}</td>
									<td className=""> <div className="" onClick={ev => {
										deleteApiKey(item.id)
									}}>Delete</div></td>
								</tr>


							</tbody>
						);
					})}
				</table>
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

			</div>
		</Layout>
	);
}

export default ApiKeys;


