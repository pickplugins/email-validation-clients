import { Component, useEffect, useState } from "react";

import { IconCheckbox, IconSquare } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onSelectRows = props.onSelectRows;
	var onChange = props.onChange;
	var columns = props.columns;
	var entries = props.entries;
	var itemPath = props.itemPath;
	var deleteRow = props.deleteRow;
	var loading = props.loading;
	// var queryPrams = props.queryPrams;

	var [queryPrams, setqueryPrams] = useState(props.queryPrams);
	var [selectedRows, setselectedRows] = useState(props.selectedRows);
	var [selectedAll, setselectedAll] = useState(false);

	useEffect(() => {
		onChange(queryPrams);
	}, [queryPrams]);

	useEffect(() => {
		if (onSelectRows) {
			onSelectRows(selectedRows);
		}
	}, [selectedRows]);

	return (
		<div className="w-full">
			<div className=" bg-gray-200 p-3 flex justify-between flex-wrap px-5">
				<div className="flex gap-2 items-center">
					<input
						type="text"
						placeholder="Search..."
						className="p-3 py-[5px] bg-gray-400 border rounded-sm border-solid "
						value={queryPrams?.keyword}
						onChange={(ev) => {
							setqueryPrams({ ...queryPrams, keyword: ev.target.value });
						}}
					/>
				</div>

				<div className=" flex gap-3 items-center">
					{loading && (
						<>
							<Spinner />
						</>
					)}

					<div> {entries?.total} Items</div>

					<div>
						{queryPrams?.page} / {entries?.maxPages}
					</div>

					<select
						name=""
						id=""
						className="border rounded-sm border-solid py-[3px] px-2 cursor-pointer"
						value={queryPrams?.order}
						onChange={(ev) => {
							setqueryPrams({ ...queryPrams, order: ev.target.value });
						}}>
						<option value="DESC">DESC</option>
						<option value="ASC">ASC</option>
					</select>

					<select
						name=""
						id=""
						className="border rounded-sm border-solid py-[3px] px-2 cursor-pointer"
						value={queryPrams?.limit}
						onChange={(ev) => {
							setqueryPrams({ ...queryPrams, limit: ev.target.value });
						}}>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="50">50</option>
						<option value="100">100</option>
						<option value="200">200</option>
					</select>

					<div
						className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer"
						onClick={(ev) => {
							var page = queryPrams.page;
							if (page == 1) return;

							//console.log(page);
							setqueryPrams({ ...queryPrams, page: queryPrams.page - 1 });
						}}>
						Previous
					</div>
					<div
						className="p-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer"
						onClick={(ev) => {
							var page = queryPrams.page + 1;
							if (page > entries?.maxPages) return;

							setqueryPrams({ ...queryPrams, page: queryPrams.page + 1 });
						}}>
						Next
					</div>
				</div>
			</div>

			<table className="table-fixed w-full text-center border-collapse">
				<thead>
					<tr className="bg-gray-300 border border-solid border-gray-200">
						{Object.entries(columns).map((args) => {
							var columnIndex = args[0];
							var columnData = args[1];

							return (
								<th
									key={columnIndex}
									className={`px-5 py-2 ${
										columnIndex == "check" ? "w-12 " : ""
									} ${columnIndex == "id" ? "w-20 " : ""} ${
										columnIndex == "email" ? "text-left pl-5" : ""
									} ${columnIndex == "title" ? "text-left pl-5" : ""}`}>
									{columnIndex == "check" && (
										<div
											onClick={(ev) => {
												console.log("Hello");
												setselectedAll(!selectedAll);
												var ids = [];

												if (!selectedAll) {
													entries?.posts.map((entry) => {
														ids.push(entry.id);
													});
													setselectedRows(ids);
												}

												if (selectedAll) {
													setselectedRows([]);
												}
											}}>
											{selectedAll && (
												<span className="cursor-pointer">
													<IconCheckbox />
												</span>
											)}
											{!selectedAll && (
												<span className="cursor-pointer">
													<IconSquare />
												</span>
											)}
										</div>
									)}
									{columnIndex != "check" && (
										<span
											className={`${
												columnIndex == "email" ? "text-left pl-5" : ""
											}`}>
											{columnData.label}
										</span>
									)}
								</th>
							);
						})}
						{deleteRow && <th>Delete</th>}
					</tr>
				</thead>
				<tbody>
					{entries == null && (
						<tr>
							<td colSpan={4} className="col-span-4 py-3">
								No items found
							</td>
						</tr>
					)}

					{entries?.posts?.map((entry, index) => {
						return (
							<tr
								key={index}
								className="border-0 border-b border-solid border-gray-200">
								{Object.entries(columns).map((args) => {
									var columnIndex = args[0];
									var columnData = args[1];

									return (
										<td
											key={columnIndex}
											className={`px-5 py-2 ${
												columnIndex == "email" ? "text-left pl-5" : ""
											} ${columnIndex == "title" ? "text-left pl-5" : ""}`}>
											
											{columnIndex == "title" && (
												<div className="flex items-center gap-2">
													{itemPath.length > 0 && (
														<Link className="" to={`/${itemPath}/${entry.id}`}>
															{entry.title}
														</Link>
													)}
													{itemPath.length == 0 && (
														<span className="cursor-pointer">
															{entry.title}
														</span>
													)}
												</div>
											)}
											{columnIndex != "title" && (
												<span
													className={`${
														columnIndex == "email" ? "text-left pl-5" : ""
													} break-all`}>
													{entry[columnIndex]}
												</span>
											)}
											{columnIndex == "check" && (
												<span
													className="mx-2"
													onClick={(ev) => {
														var selectedRowsX = [...selectedRows];

														console.log(selectedRowsX);

														var index = selectedRowsX.indexOf(entry.id);

														if (index !== -1) {
															selectedRowsX.splice(index, 1);
															setselectedRows(selectedRowsX);
														}

														if (index == -1) {
															selectedRowsX?.push(entry.id);
															setselectedRows(selectedRowsX);
														}
													}}>
													{selectedRows?.includes(entry.id) && (
														<span className="cursor-pointer">
															<IconCheckbox />
														</span>
													)}
													{!selectedRows?.includes(entry.id) && (
														<span className="cursor-pointer">
															<IconSquare />
														</span>
													)}
												</span>
											)}
										</td>
									);
								})}

								{deleteRow && (
									<td key={"delete"}>
										<span
											onClick={(ev) => {
												deleteRow(entry.id);
											}}>
											Delete
										</span>
									</td>
								)}
							</tr>
						);
					})}
				</tbody>
				<thead>
					<tr className="bg-gray-300 border border-solid border-gray-200">
						{Object.entries(columns).map((args) => {
							var columnIndex = args[0];
							var columnData = args[1];

							return (
								<th
									key={columnIndex}
									className={`px-5 py-2 ${
										columnIndex == "email" ? "text-left pl-5" : ""
									} ${columnIndex == "title" ? "text-left pl-5" : ""}`}>
									<span
										className={`${
											columnIndex == "email" ? "text-left pl-5" : ""
										}`}>
										{columnData.label}
									</span>
								</th>
							);
						})}
						{deleteRow && <th key={"delete"}>Delete</th>}
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
		var {
			entries,
			deleteRow,
			selectedRows,
			onSelectRows,
			loading,
			columns,
			itemPath,
			queryPrams,
			onChange,
		} = this.props;

		return (
			<Html
				selectedRows={selectedRows}
				onSelectRows={onSelectRows}
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

export default EntriesTable;
