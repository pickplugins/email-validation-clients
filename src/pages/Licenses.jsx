import Layout from "../components/Layout";
import { useState, useEffect } from "react";



function Licenses() {


	var [licensesData, setlicensesData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({ page: 1, limit: 12, first_date: "", last_date: "" });





	function fetchPosts() {

		var postData = {
			limit: queryPrams.limit,
			page: queryPrams.page,
		};
		postData = JSON.stringify(postData);

		fetch("http://localhost/wordpress/wp-json/combo-payments/v2/get_licenses", {
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
						setlicensesData(posts)

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



				<table className="table-fixed w-full text-center border-collapse">

					<thead>
						<tr className="bg-gray-300 border border-solid border-gray-200">
							<th className=" px-5 py-2">ID</th>
							<th className=" px-5 py-2">Order</th>
							<th className=" px-5 py-2">Email</th>
							<th className=" px-5 py-2">Limit</th>
							<th className=" px-5 py-2">Count</th>
							<th className=" px-5 py-2">License key</th>
							<th className=" px-5 py-2">Status</th>
							<th className=" px-5 py-2">Test Mode</th>
							<th className=" px-5 py-2">Trial ends</th>
							<th className=" px-5 py-2">Expire Date</th>
							<th className=" px-5 py-2">Date</th>
						</tr>

					</thead>

					{licensesData?.map((item, index) => {
						return (
							<tbody key={index}>
								<tr className="border-0 border-b border-solid border-gray-200">
									<td className=" px-5 py-2"><a className="font-bold" href={`/licenses/${item.id}`}>#{item.id}</a></td>
									<td className=""> {item.order_id}</td>
									<td className=""> {item.user_email}</td>
									<td className=""> {item.activation_limit}</td>
									<td className=""> {item.instances_count}</td>
									<td className=""> {item.license_key}</td>
									<td className=""> {item.status}</td>
									<td className=""> {item.test_mode}</td>
									<td className=""> {item.trial_ends_at}</td>
									<td className=""> {item.expires_at}</td>
									<td className=""> {item.datetime}</td>
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

export default Licenses;


