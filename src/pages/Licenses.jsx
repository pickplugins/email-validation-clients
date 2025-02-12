import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import EntriesTable from "../components/EntriesTable";
import Spinner from "../components/Spinner";



function Licenses({user}) {

	var [appData, setappData] = useState(window.appData);

	var [licensesData, setlicensesData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", limit: 10, first_date: "", last_date: "" });

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

		fetch(appData.serverUrl + "wp-json/email-validation/v2/get_licenses", {
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

						setlicensesData({ posts: posts, total: total, maxPages: max_pages })
						setloading(true);

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


	var columns = {
		id: { label: "ID" },
		order_id: { label: "Order" },
		user_email: { label: "Email" },
		activation_limit: { label: "Activation limit" },
		instances_count: { label: "Instances count" },
		license_key: { label: "License key" },
		status: { label: "Status" },
		test_mode: { label: "Test Mode" },
		trial_ends_at: { label: "Trial ends" },
		expires_at: { label: "Expires" },
		datetime: { label: "Datetime" },

	}

	function onChangeQueryPrams(queryPrams) {
		if (queryPrams) {
			setqueryPrams(queryPrams)
			fetchPosts();
		}
	}


	return (
		<Layout user={user}>
			<div>

				<EntriesTable queryPrams={queryPrams} columns={columns} entries={licensesData} itemPath={"orders"} onChange={onChangeQueryPrams} loading={loading} />


			</div>
		</Layout>
	);
}

export default Licenses;


