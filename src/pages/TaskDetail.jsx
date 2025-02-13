import { IconSettings } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import EntriesTable from "../components/EntriesTable";
import Layout from "../components/Layout";
import Popover from "../components/Popover";
import Spinner from "../components/Spinner";

function TaskDetail({ user }) {
	const { id } = useParams();

	const { token } = useContext(AuthContext);
	var [appData, setappData] = useState(window.appData);
	var [queryPrams, setqueryPrams] = useState({
		keyword: "",
		page: 1,
		order: "DESC",
		limit: 10,
		first_date: "",
		last_date: "",
	});
	var [addEntries, setaddEntries] = useState({
		emails: "",
		edit: false,
		loading: false,
		success: false,
		errors: false,
	});

	var [showExport, setshowExport] = useState(false);

	var [tasksEntries, settasksEntries] = useState(null);
	console.log(tasksEntries);
	var [loading, setloading] = useState(false);
	var [selectedRows, setselectedRows] = useState([]);
	const [showSetting, setshowSetting] = useState(false);

	function fetchPosts() {
		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}
		var postData = {
			task_id: id,
			limit: queryPrams.limit,
			page: queryPrams.page,
			order: queryPrams.order,
			status: queryPrams.status,
			safeToSend: queryPrams.safeToSend,
			isSyntaxValid: queryPrams.isSyntaxValid,
			isValidEmail: queryPrams.isValidEmail,
			hasValidDomain: queryPrams.hasValidDomain,
			isDisposableDomain: queryPrams.isDisposableDomain,
			isInboxFull: queryPrams.isInboxFull,
			isFreeEmailProvider: queryPrams.isFreeEmailProvider,
			isGibberishEmail: queryPrams.isGibberishEmail,
			checkDomainReputation: queryPrams.checkDomainReputation,
			isSMTPBlacklisted: queryPrams.isSMTPBlacklisted,
			isRoleBasedEmail: queryPrams.isRoleBasedEmail,
			isCatchAllDomain: queryPrams.isCatchAllDomain,
			verifySMTP: queryPrams.verifySMTP,
		};
		postData = JSON.stringify(postData);

		setloading(true);

		fetch(appData.serverUrl + "wp-json/email-validation/v2/get_tasks_entries", {
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
				if (response.status == 429) {
					setloading(false);

					throw new Error("Too Many Requests");
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {
						var posts = res?.posts;
						var total = res?.total;
						var max_pages = res?.max_pages;

						settasksEntries({
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

	function addTaskEntries() {
		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		setloading(true);

		var postData = {
			task_id: id,
			emails: addEntries.emails,
		};
		postData = JSON.stringify(postData);

		fetch(appData.serverUrl + "wp-json/email-validation/v2/add_tasks_entries", {
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
						// var posts = res?.posts;
						// var total = res?.total;
						// var max_pages = res?.max_pages;

						// settasksEntries({ posts: posts, total: total, maxPages: max_pages })
						setloading(false);

						fetchPosts();
						setTimeout(() => {
							setaddEntries({
								...addEntries,
								emails: "",
								edit: !addEntries.edit,
							});
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
			appData.serverUrl + "wp-json/email-validation/v2/delete_tasks_entries",
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

	function email_export() {
		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		setloading(true);

		var postData = {
			task_id: id,
			queryPrams: queryPrams,
		};
		postData = JSON.stringify(postData);

		fetch(appData.serverUrl + "wp-json/email-validation/v2/email_export", {
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
						var success = res?.success;
						var file = res?.file;

						if (success) {
							window.location.href = file;
						}

						// var total = res?.total;
						// var max_pages = res?.max_pages;

						// settasksEntries({ posts: posts, total: total, maxPages: max_pages })
						setloading(false);

						fetchPosts();
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
	}, [id]);

	var columns = {
		check: { label: "Check" },
		// id: { label: "ID" },
		email: { label: "Email" },
		status: { label: "Progress" },
		result: { label: "Result" },
		// datetime: { label: "Datetime" },
	};

	useEffect(() => {
		fetchPosts();
	}, [queryPrams]);

	function onChangeQueryPrams(args) {
		if (args) {
			setqueryPrams({ ...queryPrams, ...args });
			//fetchPosts();
		}
	}

	function onSelectRows(rows) {
		console.log(rows);
		setselectedRows(rows);
	}

	return (
		<Layout user={user}>
			<div className="flex-1">
				{/* {JSON.stringify(tasksEntries)} */}

				<div className="flex justify-between flex-wrap gap-4 p-4 ">
					<div className="flex gap-3 items-center">
						<div className="relative">
							<button
								className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer"
								onClick={(ev) => {
									setaddEntries({ ...addEntries, edit: !addEntries.edit });
								}}>
								Add Emails
							</button>
							{addEntries.edit && (
								<Popover className="top-full mt-2 bg-white px-4 py-3 rounded-sm shadow-lg border border-gray-200">
									<textarea
										name=""
										id=""
										placeholder="hello1@mail.com
hello1@mail.com
Each Mail Per Line.
"
										className="p-3  h-[150px] py-[5px] bg-gray-400 border rounded-sm border-solid w-[400px]"
										value={addEntries?.emails}
										onChange={(ev) => {
											setaddEntries({ ...addEntries, emails: ev.target.value });
										}}></textarea>
									<button
										onClick={(ev) => {
											addTaskEntries();
										}}
										className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer">
										Submit
									</button>
								</Popover>
							)}
						</div>

						{addEntries.loading && (
							<>
								<Spinner />
							</>
						)}
						{addEntries.errors && <>There is an error.</>}
						{addEntries.success && <>Task Added.</>}
					</div>

					<div className="gap-2 flex items-center flex-wrap">
						<select
							name=""
							id=""
							className="border rounded-sm border-solid py-[3px] px-2 cursor-pointer"
							value={queryPrams?.status}
							onChange={(ev) => {
								setqueryPrams({ ...queryPrams, status: ev.target.value });
							}}>
							<option value="">Status</option>
							<option value="valid">Valid</option>
							<option value="disposable">disposable</option>
							<option value="invalidEmail">invalidEmail</option>
							<option value="invalidDomain">invalidDomain</option>
							<option value="syntaxNotValid">syntaxNotValid</option>
						</select>
						<select
							name=""
							id=""
							className="border rounded-sm border-solid py-[3px] px-2 cursor-pointer"
							value={queryPrams?.safeToSend}
							onChange={(ev) => {
								setqueryPrams({ ...queryPrams, safeToSend: ev.target.value });
							}}>
							<option value="">Safe To Send</option>
							<option value="yes">yes</option>
							<option value="no">no</option>
						</select>

						<select
							name=""
							id=""
							className="border rounded-sm border-solid py-[3px] px-2 cursor-pointer"
							value={queryPrams?.isRoleBasedEmail}
							onChange={(ev) => {
								setqueryPrams({
									...queryPrams,
									isRoleBasedEmail: ev.target.value,
								});
							}}>
							<option value="">Role Based</option>
							<option value="yes">yes</option>
							<option value="no">no</option>
						</select>
						<select
							name=""
							id=""
							className="border rounded-sm border-solid py-[3px] px-2 cursor-pointer"
							value={queryPrams?.hasValidDomain}
							onChange={(ev) => {
								setqueryPrams({
									...queryPrams,
									hasValidDomain: ev.target.value,
								});
							}}>
							<option value="">Valid Domain</option>
							<option value="1">yes</option>
							<option value="0">no</option>
						</select>
						<select
							name=""
							id=""
							className="border rounded-sm border-solid py-[3px] px-2 cursor-pointer"
							value={queryPrams?.isFreeEmailProvider}
							onChange={(ev) => {
								setqueryPrams({
									...queryPrams,
									isFreeEmailProvider: ev.target.value,
								});
							}}>
							<option value="">Free Email</option>
							<option value="1">yes</option>
							<option value="0">no</option>
						</select>
						{/* <select name="" id=""
              className="border rounded-sm border-solid py-[3px] px-2 cursor-pointer"
              value={queryPrams?.verifySMTP} onChange={ev => {
                setqueryPrams({ ...queryPrams, verifySMTP: ev.target.value })

              }}>
              <option value="">Verified SMTP</option>
              <option value="1">yes</option>
              <option value="0">no</option>
            </select> */}
					</div>

					<div className="gap-2 flex items-center">
						<div className="relative">
							<button
								className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer"
								onClick={() => {
									setshowExport(!showExport);
								}}>
								Export
							</button>
							<div
								className={`absolute top-full right-0 bg-white mt-2 px-4 py-3 ${
									showExport ? "" : "hidden"
								}`}>
								<button
									className="text-nowrap cursor-pointer px-3 py-[5px] w-full rounded-sm bg-gray-600 hover:bg-gray-500 text-white mt-2"
									onClick={() => {
										email_export();
									}}>
									Export All
								</button>
								<button
									className="text-nowrap cursor-pointer px-3 py-[5px] w-full rounded-sm bg-gray-600 hover:bg-gray-500 text-white mt-2"
									onClick={() => {
										email_export();
									}}>
									Export Selected
								</button>
							</div>
						</div>

						<button
							onClick={(ev) => {
								fetchPosts();
							}}
							className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer">
							Refresh
						</button>
						{selectedRows.length > 0 && (
							<div
								className="px-3 py-[5px] rounded-sm bg-red-600 hover:bg-red-500 text-white cursor-pointer"
								onClick={(ev) => {
									delete_tasks_entries();
								}}>
								Delete Tasks
							</div>
						)}
						<button
							className=" relative px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer"
							onClick={() => {
								setshowSetting(!showSetting);
							}}>
							<IconSettings />
							{showSetting && (
								<Popover className="top-full right-0 mt-2 bg-white px-4 py-3 rounded-sm border border-gray-200 text-gray-700 text-left">
									Total Credits: 0 <br />
									Used by Task: <br />
									Used by API: <br />
									Total Used: <br />
									Reminaing Credits: NaN
								</Popover>
							)}
						</button>
					</div>
				</div>

				<EntriesTable
					queryPrams={queryPrams}
					columns={columns}
					entries={tasksEntries}
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

export default TaskDetail;
