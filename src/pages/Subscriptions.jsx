import { IconRefresh } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import EntriesTable from "../components/EntriesTable";
import Layout from "../components/Layout";

function Subscriptions({ user }) {
	var [appData, setappData] = useState(window.appData);

	var [subscriptionsData, setsubscriptionsData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({
		keyword: "",
		page: 1,
		order: "DESC",
		limit: 10,
		first_date: "",
		last_date: "",
	});

	const { t, token } = useContext(AuthContext);

	var [loading, setloading] = useState(false);

	var [selectedRows, setselectedRows] = useState([]);

	function onSelectRows(rows) {
		setselectedRows(rows);
	}

	function delete_subscriptions() {
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
			appData.serverUrl + "wp-json/email-validation/v2/delete_subscriptions",
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

		fetch(appData.serverUrl + "wp-json/email-validation/v2/get_subscriptions", {
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
						var posts = res?.posts;
						var total = res?.total;
						var max_pages = res?.max_pages;

						setsubscriptionsData({
							posts: posts,
							total: total,
							maxPages: max_pages,
						});
						setloading(false);

						setTimeout(() => {}, 500);
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
		check: { label: t("Check") },
		id: { label: t("ID") },
		// order_id: { label: "Order id" },
		user_name: { label: t("User name") },
		user_email: { label: t("Email") },
		// test_mode: { label: "Test Mode" },
		trial_ends_at: { label: t("Trial Ends") },
		renews_at: { label: t("Renews") },
		total: { label: t("Total") },

		datetime: { label: t("Datetime") },
	};

	function onChangeQueryPrams(queryPrams) {
		if (queryPrams) {
			setqueryPrams(queryPrams);
			fetchPosts();
		}
	}

	return (
		<Layout user={user}>
			<div>
				<div className="flex w-full gap-2 md:justify-end p-4">
					{selectedRows.length > 0 && (
						<div
							className="px-3 py-[5px] rounded-sm bg-red-600 hover:bg-red-500 text-white cursor-pointer"
							onClick={() => {
								delete_subscriptions();
							}}>
							{t("Delete Subscriptions")}
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
					entries={subscriptionsData}
					itemPath={"subscriptions"}
					onChange={onChangeQueryPrams}
					loading={loading}
					selectedRows={selectedRows}
					onSelectRows={onSelectRows}
				/>
			</div>
		</Layout>
	);
}

export default Subscriptions;
