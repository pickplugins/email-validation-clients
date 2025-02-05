import { useState, useEffect, Component } from "react";





function Html(props) {
	if (!props.warn) {
		return null;
	}


	var [ordersData, setordersData] = useState(null);
	var [paginations, setpaginations] = useState(null);

	var [queryPrams, setqueryPrams] = useState({ page: 1, limit: 12, first_date: "", last_date: "" });







	function fetchPosts() {

		var postData = {
			limit: queryPrams.limit,
			page: queryPrams.page,
		};
		postData = JSON.stringify(postData);

		fetch("http://localhost/wordpress/wp-json/combo-payments/v2/get_orders", {
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
						setordersData(posts)
						setpaginations(pagination)

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
	}, []);


	return (
		<div className=" mt-4">

			<div onClick={ev => {
				console.log("Hello");
			}}>Active</div>

			<table className="table-fixed w-full text-center border-collapse">

				<thead>
					<tr className="bg-gray-300">
						<th className="border border-solid border-gray-200 px-5 py-2">ID</th>
						<th className="border border-solid border-gray-200 px-5 py-2">Status</th>
						<th className="border border-solid border-gray-200 px-5 py-2">Setup Fee</th>
						<th className="border border-solid border-gray-200 px-5 py-2">Tax</th>
						<th className="border border-solid border-gray-200 px-5 py-2">Discount</th>
						<th className="border border-solid border-gray-200 px-5 py-2" >Total</th>
						<th className="border border-solid border-gray-200 px-5 py-2">Refunded_total</th>
						<th className="border border-solid border-gray-200 px-5 py-2">Date</th>
					</tr>

				</thead>

				{ordersData?.map((item, index) => {
					return (
						<tbody key={index}>
							<tr>
								<td className="border border-solid border-gray-200 px-5 py-2"><a className="font-bold" href={`/orders/${item.id}`}>Order #{item.id}</a></td>
								<td className="border border-solid border-gray-200"> {item.status}</td>
								<td className="border border-solid border-gray-200"> {item.setup_fee}</td>
								<td className="border border-solid border-gray-200"> {item.tax_total}</td>
								<td className="border border-solid border-gray-200"> {item.discount_total}</td>
								<td className="border border-solid border-gray-200"> {item.total}</td>
								<td className="border border-solid border-gray-200"> {item.refunded_total}</td>
								<td className="border border-solid border-gray-200"> {item.datetime}</td>
							</tr>


						</tbody>
					);
				})}
			</table>

			{JSON.stringify(queryPrams)}

			<div className="my-4 flex gap-3">

				dgfsdf

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
	);
}


class OrdersList extends Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}

	render() {
		var { blockName, blockId, clientId, onChange } = this.props;

		return (
			<Html
				blockId={blockId}
				clientId={clientId}
				blockName={blockName}
				onChange={onChange}
				warn={this.state.showWarning}
			/>
		);
	}
}



export default OrdersList