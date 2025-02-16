import Layout from "../components/Layout";
import UserAccount from "../components/UserAccount";
import EntriesTable from "../components/EntriesTable";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";



function Orders({ user }) {

	var [appData, setappData] = useState(window.appData);

	var [ordersData, setordersData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", limit: 10, first_date: "", last_date: "" });

	var [loading, setloading] = useState(false);


	var columns = {
		id: { label: "ID" },
		user_name: { label: "User Name" },
		status: { label: "Status" },
		discount_total: { label: "Discount" },
		subtotal: { label: "Total" },
		refunded_total: { label: "Refunded" },
		datetime: { label: "Datetime" },
	}



	function fetchPosts() {

		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}


		if (queryPrams.page < 0) {
			return;
		}

		var postData = {
			limit: queryPrams.limit,
			page: queryPrams.page,
			order: queryPrams.order,
		};
		postData = JSON.stringify(postData);
		setloading(true);

		fetch(appData.serverUrl + "wp-json/email-validation/v2/get_orders", {
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

						setordersData({ posts: posts, total: total, maxPages: max_pages })
						//setqueryPrams({ ...queryPrams, loading: false })
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


	useEffect(() => {

		fetchPosts();
	}, [queryPrams]);


	function onChangeQueryPrams(queryPrams) {
		if (queryPrams) {
			setqueryPrams(queryPrams)
			fetchPosts();
		}

	}



	useEffect(() => {
		//checkUser();
	}, []);


	return (
		<Layout user={user}>
			<div>

				<EntriesTable queryPrams={queryPrams} columns={columns} entries={ordersData} itemPath={"orders"} onChange={onChangeQueryPrams} loading={loading} />



			</div>
		</Layout>
	);
}

export default Orders;
