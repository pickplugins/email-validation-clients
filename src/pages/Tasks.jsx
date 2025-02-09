import Layout from "../components/Layout";
import UserAccount from "../components/UserAccount";
import EntriesTable from "../components/EntriesTable";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";



function Tasks() {

	var [appData, setappData] = useState(window.appData);

	var [addTask, setaddTask] = useState({ title: "", edit: false, loading: false, success: false, errors: false });
	var [tasksData, settasksData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", limit: 10, first_date: "", last_date: "" });

	var [loading, setloading] = useState(false);


	var columns = {
		id: { label: "ID" },
		title: { label: "Title" },
		status: { label: "Status" },
		total: { label: "Total" },

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

		fetch(appData.serverUrl + "wp-json/email-validation/v2/get_tasks", {
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

						console.log(res)

						var posts = res?.posts;
						var total = res?.total;
						var max_pages = res?.max_pages;

						settasksData({ posts: posts, total: total, maxPages: max_pages })
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


	function createtask() {

		const token = localStorage.getItem("token");

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

						setaddTask({ ...addTask, loading: false, errors: errors, success: success })

						setTimeout(() => {
							setaddTask({ ...addTask, title: "", success: null, errors: null })

						}, 3000);
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
		<Layout>
			<div>

				<div className="flex justify-between p-4 ">

					<div className="flex gap-3 items-center">
						<div className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer" onClick={ev => {
							setaddTask({ ...addTask, edit: !addTask.edit })
						}}>Add</div>

						{addTask.edit && (
							<>
								<input type="text" placeholder="Task Title" className="p-3 py-[5px] bg-gray-400 border rounded-sm border-solid " value={addTask?.title} onChange={ev => {
									setaddTask({ ...addTask, title: ev.target.value })

								}} />

								<div onClick={ev => {
									createtask();
									setaddTask({ ...addTask, loading: true })

								}} className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer" >Submit</div>
							</>
						)}

						{addTask.loading && (
							<><Spinner /></>
						)}
						{addTask.errors && (
							<>There is an error.</>
						)}
						{addTask.success && (
							<>Task Added.</>
						)}

					</div>



					<div></div>
				</div>

				<EntriesTable queryPrams={queryPrams} columns={columns} entries={tasksData} itemPath={"tasks"} onChange={onChangeQueryPrams} loading={loading} />



			</div>
		</Layout>
	);
}

export default Tasks;
