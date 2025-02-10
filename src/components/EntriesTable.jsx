import { useState, useEffect, Component } from "react";

import Spinner from "../components/Spinner";
import { Link } from 'react-router-dom';




function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;
	var columns = props.columns;
	var entries = props.entries;
	var itemPath = props.itemPath;
	var deleteRow = props.deleteRow;
	var loading = props.loading;
	// var queryPrams = props.queryPrams;

	console.log(entries);

	var [queryPrams, setqueryPrams] = useState(props.queryPrams);

	useEffect(() => {
		onChange(queryPrams);
	}, [queryPrams]);


	return (
		<div className="">

			<div className=" bg-gray-200 p-3 flex justify-between px-5">

				<div>
					<input type="text" placeholder="Search..." className="p-3 py-[5px] bg-gray-400 border rounded-sm border-solid " value={queryPrams?.keyword} onChange={ev => {
						setqueryPrams({ ...queryPrams, keyword: ev.target.value })

					}} />



				</div>

				<div className=" flex gap-3 items-center">

					{loading && (
						<>
							<Spinner />
						</>
					)}

					<div> {entries?.total} Items</div>

					<div>{queryPrams?.page} / {entries?.maxPages}</div>

					<select name="" id=""
						className="border rounded-sm border-solid py-[3px] px-2 cursor-pointer"
						value={queryPrams?.order} onChange={ev => {
							setqueryPrams({ ...queryPrams, order: ev.target.value })

						}}>
						<option value="DESC">DESC</option>
						<option value="ASC">ASC</option>
					</select>

					<select name="" id=""
						className="border rounded-sm border-solid py-[3px] px-2 cursor-pointer"
						value={queryPrams?.limit} onChange={ev => {
							setqueryPrams({ ...queryPrams, limit: ev.target.value })

						}}>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="50">50</option>
						<option value="100">100</option>
						<option value="200">200</option>
					</select>

					<div className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer" onClick={ev => {

						var page = queryPrams.page;
						if (page == 1) return;

						//console.log(page);
						setqueryPrams({ ...queryPrams, page: queryPrams.page - 1 })

					}} >Previous</div>
					<div className="p-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer" onClick={ev => {


						var page = queryPrams.page + 1
						if (page > entries?.maxPages) return;

						setqueryPrams({ ...queryPrams, page: queryPrams.page + 1 })

					}}>Next</div>



				</div>
			</div>

			<table className="table-fixed w-full text-center border-collapse">

				<thead>
					<tr className="bg-gray-300 border border-solid border-gray-200">
						{Object.entries(columns).map(args => {

							var columnIndex = args[0]
							var columnData = args[1]

							return (
								<th key={columnIndex} className={`px-5 py-2 ${columnIndex == 'id' ? "w-20 " : ""} ${columnIndex == 'email' ? "text-left pl-5" : ""} ${columnIndex == 'title' ? "text-left pl-5" : ""}`}>

									<span className={`${columnIndex == 'email' ? "text-left pl-5" : ""}`}>{columnData.label}</span>
								</th>
							)
						})}
						{deleteRow && (
							<th>Delete</th>
						)}
					</tr>
				</thead>
				<tbody >

					{entries == null && (

						<tr><td colSpan={4} className="col-span-4 py-3">No items found</td></tr>
					)}

					{entries?.posts?.map((entry, index) => {
						return (
							<tr key={index} className="border-0 border-b border-solid border-gray-200">

								{Object.entries(columns).map(args => {

									var columnIndex = args[0]
									var columnData = args[1]


									return (
										<td key={columnIndex} className={`px-5 py-2 ${columnIndex == 'email' ? "text-left pl-5" : ""} ${columnIndex == 'title' ? "text-left pl-5" : ""}`}>

											{columnIndex == 'id' && (
												<>

													{itemPath.length > 0 && (
														<Link className="text-xs" to={`/${itemPath}/${entry.id}`}>#{entry.id}</Link>
													)}
													{itemPath.length == 0 && (
														<span className="text-xs" >#{entry.id}</span>
													)}


												</>
											)}
											{columnIndex != 'id' && (
												<span className={`${columnIndex == 'email' ? "text-left pl-5" : ""}`}>
													{entry[columnIndex]}
												</span>
											)}


										</td>
									)
								})}

								{deleteRow && (
									<td key={'delete'}>
										<span onClick={ev => {
											deleteRow(entry.id)
										}}>Delete</span>
									</td>
								)}

							</tr>



						);
					})}
				</tbody>
				<thead>
					<tr className="bg-gray-300 border border-solid border-gray-200">
						{Object.entries(columns).map(args => {

							var columnIndex = args[0]
							var columnData = args[1]

							return (

								<th key={columnIndex} className={`px-5 py-2 ${columnIndex == 'email' ? "text-left pl-5" : ""} ${columnIndex == 'title' ? "text-left pl-5" : ""}`}>
									<span className={`${columnIndex == 'email' ? "text-left pl-5" : ""}`}>{columnData.label}</span>

								</th>

							)
						})}
						{deleteRow && (
							<th key={'delete'}>Delete</th>
						)}
					</tr>
				</thead>
			</table>

		</div>
	);
}


class EntriesTable extends Component {
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
		var { entries, deleteRow, loading, columns, itemPath, queryPrams, onChange } = this.props;

		return (
			<Html
				deleteRow={deleteRow}
				loading={loading}
				columns={columns}
				entries={entries}
				itemPath={itemPath}
				queryPrams={queryPrams}
				onChange={onChange}
				warn={this.state.showWarning}
			/>
		);
	}
}



export default EntriesTable