import Layout from "../components/Layout";
import { useState, useEffect } from "react";



function Subscriptions() {


	var [subscriptionsData, setsubscriptionsData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({ page: 1, limit: 12, first_date: "", last_date: "" });





	function fetchPosts() {

		var postData = {
			limit: queryPrams.limit,
			page: queryPrams.page,
		};
		postData = JSON.stringify(postData);

		fetch("http://localhost/wordpress/wp-json/combo-payments/v2/get_subscriptions", {
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
						var pagination = res?.pagination;


						console.log(res);
						setsubscriptionsData(posts)
						//setpaginations(pagination)

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
							<th className=" px-5 py-2 w-30">ID</th>
							<th className=" px-5 py-2">Order</th>
							<th className=" px-5 py-2">Email</th>
							<th className=" px-5 py-2">Setup Fee</th>
							<th className=" px-5 py-2">Tax</th>
							<th className=" px-5 py-2">Discount</th>
							<th className=" px-5 py-2" >Total</th>
							<th className=" px-5 py-2">Billing anchor</th>
							<th className=" px-5 py-2">Card last four</th>
							<th className=" px-5 py-2">Test Mode</th>
							<th className=" px-5 py-2">Trial ends</th>
							<th className=" px-5 py-2">Renews at</th>
							<th className=" px-5 py-2">Date</th>
						</tr>

					</thead>

					{subscriptionsData?.map((item, index) => {
						return (
							<tbody key={index}>
								<tr className="border-0 border-b border-solid border-gray-200">
									<td className=" px-5 py-2"><a className="font-bold" href={`/subscriptions/${item.id}`}>#{item.id}</a></td>
									<td className=""> {item.order_id}</td>
									<td className=""> {item.user_email}</td>
									<td className=""> {item.setup_fee}</td>
									<td className=""> {item.tax_total}</td>
									<td className=""> {item.discount_total}</td>
									<td className=""> {item.total}</td>
									<td className=""> {item.billing_anchor}</td>
									<td className=""> {item.card_last_four}</td>
									<td className=""> {item.test_mode}</td>
									<td className=""> {item.trial_ends_at}</td>
									<td className=""> {item.renews_at}</td>
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

export default Subscriptions;
