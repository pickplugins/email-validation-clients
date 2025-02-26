import { Component, useContext, useEffect, useState } from "react";

import {
	IconCheckbox,
	IconSquare,
	IconArrowNarrowLeftDashed,
	IconArrowNarrowRightDashed,
	IconRefresh,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { AuthContext } from "./AuthContext";

function Html(props) {
	const { t } = useContext(AuthContext);
	if (!props.warn) {
		return null;
	}

	var onRefreshRequest = props.onRefreshRequest;
	var onSelectRows = props.onSelectRows;
	var onChange = props.onChange;
	var columns = props.columns;
	var entries = props.entries;
	var itemPath = props.itemPath;
	var deleteRow = props.deleteRow;
	var loading = props.loading;
	var [queryPrams, setqueryPrams] = useState(props.queryPrams);
	var [selectedRows, setselectedRows] = useState(props.selectedRows);
	var [selectedAll, setselectedAll] = useState(false);
	var [anchorId, setAnchorId] = useState(null);
	var [lastCheckedId, setLastCheckedId] = useState(null);

	useEffect(() => {
		onChange(queryPrams);
	}, [queryPrams]);

	useEffect(() => {
		if (onSelectRows) {
			onSelectRows(selectedRows);
		}
	}, [selectedRows]);

	const handleRowSelection = (entryId, shiftKey) => {
		var selectedRowsX = [...selectedRows];

		if (shiftKey && lastCheckedId !== null) {
			const currentIndex = entries.posts.findIndex(
				(entry) => entry.id === entryId
			);
			const lastIndex = entries.posts.findIndex(
				(entry) => entry.id === lastCheckedId
			);
			const [start, end] = [
				Math.min(currentIndex, lastIndex),
				Math.max(currentIndex, lastIndex),
			];

			// Clear previous selections
			selectedRowsX = [];

			// Select all items in range
			entries.posts.slice(start, end + 1).forEach((entry) => {
				selectedRowsX.push(entry.id);
			});
		} else {
			const index = selectedRowsX.indexOf(entryId);
			if (index !== -1) {
				selectedRowsX.splice(index, 1);
				setAnchorId(null);
			} else {
				selectedRowsX.push(entryId);
				setAnchorId(entryId);
			}
		}

		setLastCheckedId(entryId);
		setselectedRows(selectedRowsX);
	};

	function maskMiddle(text) {
		if (text.length <= 4) return text; // If the text is too short, return as is

		const firstPart = text.slice(0, 2);
		const lastPart = text.slice(-2);
		const maskedPart = "*".repeat(text.length - 4);

		return firstPart + maskedPart + lastPart;
	}

	return (
		<div className="w-full bg-gray-100 p-5 ">
			<div className="rounded-md bg-white">
				<div className=" p-3 flex justify-between flex-wrap gap-3 px-5 ">
					<div className="flex gap-2 items-center">
						<input
							type="text"
							placeholder="Search..."
							className=" "
							value={queryPrams?.keyword}
							onChange={(ev) => {
								setqueryPrams({ ...queryPrams, keyword: ev.target.value });
							}}
						/>
					</div>

					<div className="flex flex-wrap gap-3 items-center">
						{loading && (
							<>
								<Spinner />
							</>
						)}

						<div> {entries?.total} {t("Items")}</div>

						<div>
							{queryPrams?.page} / {entries?.maxPages}
						</div>

						{onRefreshRequest && (

							<button
								onClick={() => {
									onRefreshRequest();
								}}
								className="">
								<IconRefresh />
							</button>
						)}

						<select
							name=""
							id=""
							className=" "
							value={queryPrams?.order}
							onChange={(ev) => {
								setqueryPrams({ ...queryPrams, order: ev.target.value });
							}}>
							<option value="DESC">{t("DESC")}</option>
							<option value="ASC">{t("ASC")}</option>
						</select>

						<select
							name=""
							id=""
							className=""
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

						<div className="
					flex items-center gap-3">
							<button
								className=" "
								onClick={(ev) => {
									var page = queryPrams.page;
									if (page == 1) return;
									setqueryPrams({ ...queryPrams, page: queryPrams.page - 1 });
								}}>
								<IconArrowNarrowLeftDashed />
							</button>
							<button
								className=" "
								onClick={(ev) => {
									var page = queryPrams.page + 1;
									if (page > entries?.maxPages) return;
									setqueryPrams({ ...queryPrams, page: queryPrams.page + 1 });
								}}>
								<IconArrowNarrowRightDashed />
							</button>
						</div>
					</div>
				</div>

				<div className="overflow-x-auto w-full">
					<table className="table-auto md:table-fixed w-full text-center border-collapse">
						<thead>
							<tr className="bg-gray-200 border border-solid border-gray-200">
								{Object.entries(columns).map((args) => {
									var columnIndex = args[0];
									var columnData = args[1];
									return (
										<th
											key={columnIndex}
											className={`px-5 py-2 text-gray-600 ${columnIndex == "check" ? "w-12 " : ""
												} ${columnIndex == "id" ? "w-20 " : ""} ${columnIndex == "email" ? "text-left pl-5" : ""
												} ${columnIndex == "title" ? "text-left pl-5" : ""}`}>
											{columnIndex == "check" && (
												<div
													onClick={(ev) => {
														setselectedAll(!selectedAll);
														if (!selectedAll) {
															const ids = entries?.posts.map((entry) => entry.id);
															setselectedRows(ids);
														} else {
															setselectedRows([]);
														}
														setAnchorId(null);
														setLastCheckedId(null);
													}}>
													{selectedAll && (
														<span className="cursor-pointer text-gray-600">
															<IconCheckbox />
														</span>
													)}
													{!selectedAll && (
														<span className="cursor-pointer text-gray-400">
															<IconSquare />
														</span>
													)}
												</div>
											)}
											{columnIndex != "check" && (
												<span
													className={`${columnIndex == "email" ? "text-left pl-5" : ""
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
										{t("No items found")}
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
													className={`px-5 py-2 break-all ${columnIndex == "email" ? "text-left pl-5" : ""
														} ${columnIndex == "title" ? "text-left pl-5" : ""}`}>




													{columnIndex == "id" && (
														<div className="flex items-center gap-2 select-none">
															{itemPath.length > 0 && (
																<Link className="" to={`/${itemPath}/${entry.id}`}>
																	{"#" + entry.id}
																</Link>
															)}
															{itemPath.length == 0 && (
																<span className="cursor-pointer select-none">
																	{"#" + entry.id}
																</span>
															)}
														</div>
													)}
													{columnIndex == "title" && (
														<div className="flex items-center gap-2 select-none">
															{itemPath.length > 0 && (
																<Link className="" to={`/${itemPath}/${entry.id}`}>
																	{entry.title.length == 0 ? "#" + entry.id : entry.title}
																</Link>
															)}
															{itemPath.length == 0 && (
																<span className="cursor-pointer select-none">
																	{entry.title.length == 0 ? "#" + entry.id : entry.title}
																</span>
															)}
														</div>
													)}




													{columnIndex != "title" && columnIndex != "check" && columnIndex != 'apikey' && columnIndex != 'id' && (
														<span
															className={`${columnIndex == "email" ? "text-left pl-5" : ""
																} `}>
															{entry[columnIndex]}
														</span>
													)}
													{columnIndex == "apikey" && (
														<span
															className={`${columnIndex == "email" ? "text-left pl-5" : ""
																} break-all`}>
															{maskMiddle(entry[columnIndex])}
															{/* {entry[columnIndex]} */}
														</span>
													)}
													{columnIndex == "check" && (
														<span
															className="mx-2"
															onClick={(ev) =>
																handleRowSelection(entry.id, ev.shiftKey)
															}>
															{selectedRows?.includes(entry.id) && (
																<span className="text-gray-600">
																	<IconCheckbox />
																</span>
															)}
															{!selectedRows?.includes(entry.id) && (
																<span className="cursor-pointer text-gray-400">
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
													{t("Delete")}
												</span>
											</td>
										)}
									</tr>
								);
							})}
						</tbody>
						<thead>
							<tr className="bg-gray-200 border border-solid border-gray-200">
								{Object.entries(columns).map((args) => {
									var columnIndex = args[0];
									var columnData = args[1];
									return (
										<th
											key={columnIndex}
											className={`px-5 py-2 text-gray-600 ${columnIndex == "check" ? "w-12 " : ""
												} ${columnIndex == "id" ? "w-20 " : ""} ${columnIndex == "email" ? "text-left pl-5" : ""
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
														<span className="cursor-pointer text-gray-600">
															<IconCheckbox />
														</span>
													)}
													{!selectedAll && (
														<span className="cursor-pointer text-gray-400">
															<IconSquare />
														</span>
													)}
												</div>
											)}
											{columnIndex != "check" && (
												<span
													className={`${columnIndex == "email" ? "text-left pl-5" : ""
														}`}>
													{columnData.label}
												</span>
											)}
										</th>
									);
								})}
								{deleteRow && <th>{t("Delete")}</th>}
							</tr>
						</thead>
					</table>
				</div>
			</div>
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
			onRefreshRequest,
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
				onRefreshRequest={onRefreshRequest}
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
