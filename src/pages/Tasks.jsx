import { IconRefresh } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import EntriesTable from "../components/EntriesTable";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import {
	IconPlus,
} from "@tabler/icons-react";


function Tasks({ user }) {
	const { token, t } = useContext(AuthContext);

	var [appData, setappData] = useState(window.appData);

	var [addTask, setaddTask] = useState({
		title: "",
		edit: false,
		loading: false,
		success: false,
		errors: false,
	});
	var [tasksData, settasksData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({
		keyword: "",
		page: 1,
		order: "DESC",
		limit: 10,
		first_date: "",
		last_date: "",
	});

	var [loading, setloading] = useState(false);
	var [selectedRows, setselectedRows] = useState([]);
	var [bulkUpdatePrams, setbulkUpdatePrams] = useState({
		status: "",
	});

	var columns = {
		check: { label: "Check" },

		// id: { label: "ID" },
		title: { label: "Title" },

		status: { label: "Status" },
		total: { label: "Total" },
		completed: { label: "Completed" },
		pending: { label: "Pending" },
		user_name: { label: "User" },

		datetime: { label: "Datetime" },
	};

	function fetchPosts() {
		//const token = localStorage.getItem("token");

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

		fetch(appData.serverUrl + "wp-json/email-validation/v2/get_tasks", {
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

						settasksData({ posts: posts, total: total, maxPages: max_pages });
						//setqueryPrams({ ...queryPrams, loading: false })
						setloading(false);

						setTimeout(() => { }, 500);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});
	}

	function createtask() {
		//const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		if (queryPrams.page < 0) {
			return;
		}

		var postData = {
			title: addTask.title,
		};
		postData = JSON.stringify(postData);

		fetch(appData.serverUrl + "wp-json/email-validation/v2/create_task", {
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

						fetchPosts();

						setaddTask({
							...addTask,
							loading: false,
							errors: errors,
							success: success,
						});

						setTimeout(() => {
							setaddTask({
								...addTask,
								title: "",
								success: null,
								errors: null,
							});
						}, 3000);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});
	}

	function delete_tasks() {
		//const token = localStorage.getItem("token");

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
		fetch(appData.serverUrl + "wp-json/email-validation/v2/delete_tasks", {
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

	function bulk_update_tasks() {
		// //const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		var postData = {
			ids: selectedRows,
			status: bulkUpdatePrams.status,
		};
		postData = JSON.stringify(postData);
		setloading(true);
		fetch(appData.serverUrl + "wp-json/email-validation/v2/bulk_update_tasks", {
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
						//setcurrentObject(res)
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

	useEffect(() => {
		bulk_update_tasks();
	}, [bulkUpdatePrams]);

	useEffect(() => {
		fetchPosts();
	}, [queryPrams]);

	function onChangeQueryPrams(queryPrams) {
		if (queryPrams) {
			setqueryPrams(queryPrams);
			fetchPosts();
		}
	}
	function onSelectRows(rows) {
		setselectedRows(rows);
	}

	function onRefreshRequest(rows) {
		fetchPosts();
	}

	useEffect(() => {
		//checkUser();
	}, []);

	return (
		<Layout user={user}>
			<div>
				<div className="flex justify-between p-4 ">
					<div className="flex gap-2 flex-wrap items-center">
						<button
							className=" flex gap-2    "
							onClick={(ev) => {
								setaddTask({ ...addTask, edit: !addTask.edit });
							}}>
							<IconPlus /> {t("Add")}
						</button>

						{addTask.edit && (
							<>
								<input
									type="text"
									placeholder="Task Title"
									className="p-3 py-[5px] bg-gray-400 border rounded-sm border-solid "
									value={addTask?.title}
									onChange={(ev) => {
										setaddTask({ ...addTask, title: ev.target.value });
									}}
								/>

								<button
									onClick={(ev) => {
										createtask();
										setaddTask({ ...addTask, loading: true });
									}}
									className="">
									{t("Submit")}
								</button>
							</>
						)}

						{addTask.loading && (
							<>
								<Spinner />
							</>
						)}
						{addTask.errors && <>{t("There is an error.")}</>}
						{addTask.success && <>{t("Task Added.")}</>}
					</div>

					<div className="flex gap-2 items-center">
						{selectedRows.length > 0 && (
							<div className="flex gap-2 items-center">
								<select
									name=""
									id=""
									className="border rounded-sm border-solid py-[3px] px-2 cursor-pointer"
									value={bulkUpdatePrams.status}
									onChange={(ev) => {
										setbulkUpdatePrams({
											...bulkUpdatePrams,
											status: ev.target.value,
										});
									}}>
									<option value="">Makred as</option>
									<option value="completed">Completed</option>
									<option value="pending">Pending</option>
								</select>

								<div
									className="px-3 py-[5px] rounded-sm bg-red-600 hover:bg-red-500 text-white cursor-pointer"
									onClick={(ev) => {
										delete_tasks();
									}}>
									{t("Delete Tasks")}
								</div>
							</div>
						)}


					</div>
				</div>

				<EntriesTable
					queryPrams={queryPrams}
					columns={columns}
					entries={tasksData}
					itemPath={"tasks"}
					onChange={onChangeQueryPrams}
					loading={loading}
					selectedRows={selectedRows}
					onSelectRows={onSelectRows}
					onRefreshRequest={onRefreshRequest}

				/>
			</div>
		</Layout>
	);
}

export default Tasks;
