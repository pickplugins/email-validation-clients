
import React from "react";

import { IconSettings } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import EntriesTable from "../components/EntriesTable";
import Layout from "../components/Layout";
import Popover from "../components/Popover";
import Spinner from "../components/Spinner";
import Tab from "../components/Tab";
import Tabs from "../components/Tabs";
import {
  IconRefresh, IconTableExport, IconChartHistogram, IconFilterCog
} from "@tabler/icons-react";
function TaskDetail({ user }) {
  const { id } = useParams();

  const { token, t } = useContext(AuthContext);
  var [appData, setappData] = useState(window.appData);
  var [currentObject, setcurrentObject] = useState(null);

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

  var [addFiltersPrams, setaddFiltersPrams] = useState({ show: false });
  var [showExport, setshowExport] = useState(false);
  var [reportsPrams, setreportsPrams] = useState({ show: false });

  var [tasksEntries, settasksEntries] = useState(null);
  var [loading, setloading] = useState(false);
  var [selectedRows, setselectedRows] = useState([]);
  const [showSetting, setshowSetting] = useState(false);
  const [csvUploadPrams, setcsvUploadPrams] = useState(null);

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

            setTimeout(() => { }, 500);
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
  function addTaskEntriesCSV() {
    // const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    setloading(true);

    var postData = {
      task_id: id,
      emails: csvUploadPrams.emails,
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
              setcsvUploadPrams({
                ...csvUploadPrams,
                emails: "",

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
  function get_current_object() {
    // const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    if (queryPrams.page < 0) {
      return;
    }

    var postData = {
      id: id,
    };
    postData = JSON.stringify(postData);
    setloading(true);
    fetch(
      appData.serverUrl + "wp-json/email-validation/v2/get_task",
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
            setcurrentObject(res)
            // fetchPosts();

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
  function update_current_object() {
    // const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    // if (currentObject.id < 0) {
    //   return;
    // }

    var postData = currentObject;
    postData = JSON.stringify(postData);
    setloading(true);
    fetch(
      appData.serverUrl + "wp-json/email-validation/v2/update_task",
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
            //setcurrentObject(res)
            // fetchPosts();

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
            setTimeout(() => { }, 500);
          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });
  }


  function get_task_report() {
    // const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    setloading(true);

    var postData = {
      id: id,
    };
    postData = JSON.stringify(postData);

    fetch(appData.serverUrl + "wp-json/email-validation/v2/get_task_report", {
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
            //var success = res?.success;
            //var file = res?.file;
            console.log("get_task_report")
            console.log(res)
            setreportsPrams({ ...reportsPrams, ...res })

            // var total = res?.total;
            // var max_pages = res?.max_pages;

            // settasksEntries({ posts: posts, total: total, maxPages: max_pages })
            setloading(false);

            //fetchPosts();
            setTimeout(() => { }, 500);
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
    get_task_report()
  }, [id]);




  var columns = {
    check: { label: t("Check") },
    // id: { label: "ID" },
    email: { label: t("Email") },
    status: { label: t("Progress") },
    result: { label: t("Result") },
    // datetime: { label: "Datetime" },
  };

  useEffect(() => {
    fetchPosts();
  }, [queryPrams]);
  useEffect(() => {
    get_current_object();

  }, []);

  function onChangeQueryPrams(args) {
    if (args) {
      setqueryPrams({ ...queryPrams, ...args });
      //fetchPosts();
    }
  }

  function onSelectRows(rows) {
    setselectedRows(rows);
  }


  function parseCSV(csvText) {
    const rows = csvText.split("\n").map(row => row.split(","));
    // document.getElementById('output').textContent = JSON.stringify(rows, null, 2);
  }

  function extractEmails(csvText) {
    const rows = csvText.trim().split("\n").map(row => row.split(","));
    const headers = rows[0]; // First row as header
    const emailIndex = headers.findIndex(header => header.toLowerCase().includes("email"));

    if (emailIndex === -1) {
      document.getElementById("output").textContent = "No 'email' column found!";
      return;
    }

    // Extract emails from subsequent rows
    const emails = rows.slice(1).map(row => row[emailIndex]).filter(email => email);

    setcsvUploadPrams({ ...csvUploadPrams, emails: emails.join("\n") });


    //document.getElementById("output").textContent = "Extracted Emails:\n" + emails.join("\n");
  }

  return (
		<Layout user={user}>
			<div className="flex-1">
				<div className="flex justify-between flex-wrap gap-4 p-4 ">
					<div className="flex gap-3 items-center">
						<div className="relative">
							<button
								className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer"
								onClick={(ev) => {
									setaddEntries({ ...addEntries, edit: !addEntries.edit });
								}}>
								{t("Add Emails")}
							</button>
							{addEntries.edit && (
								<Popover className="top-full mt-2 w-[450px] bg-white px-4 py-3 rounded-sm shadow-lg border border-gray-200">
									<Tabs tabs={[{ label: "Manual" }, { label: "CSV Upload" }]}>
										<Tab index={0}>
											<h2>{t("Add Emails Manually.")}</h2>

											<textarea
												name=""
												id=""
												placeholder="hello1@mail.com
hello1@mail.com
Each Mail Per Line.
"
												className="p-3  h-[150px] py-[5px] bg-gray-400 border rounded-sm border-solid w-full"
												value={addEntries?.emails}
												onChange={(ev) => {
													setaddEntries({
														...addEntries,
														emails: ev.target.value,
													});
												}}></textarea>
											<button
												onClick={(ev) => {
													addTaskEntries();
												}}
												className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer">
												{t("Submit")}
											</button>
										</Tab>
										<Tab index={1}>
											<h2>{t("Pick a CSV file")}</h2>

											<div className="my-4">
												<input
													type="file"
													className="p-3 bg-blue-100  py-[5px]  border-2 w-full cursor-pointer border-blue-500 rounded-sm border-solid "
													value={""}
													onChange={(ev) => {
														const file = ev.target.files[0];
														if (!file) return;

														const reader = new FileReader();
														reader.onload = function (e) {
															const text = e.target.result;
															// parseCSV(text);
															extractEmails(text);
														};
														reader.readAsText(file);
													}}
												/>

												<textarea
													name=""
													id=""
													placeholder="hello1@mail.com
hello1@mail.com
Each Mail Per Line.
"
													className="p-3 my-4 h-[150px] py-[5px] bg-gray-400 border rounded-sm border-solid w-full"
													value={csvUploadPrams?.emails}
													onChange={(ev) => {
														setcsvUploadPrams({
															...csvUploadPrams,
															emails: ev.target.value,
														});
													}}></textarea>
												<button
													onClick={(ev) => {
														addTaskEntriesCSV();
													}}
													className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer">
													Submit
												</button>
											</div>
										</Tab>
									</Tabs>
								</Popover>
							)}
						</div>

						<div>
							{addEntries.loading && (
								<>
									<Spinner />
								</>
							)}
							{addEntries.errors && <>{t("There is an error.")}</>}
							{addEntries.success && <>{t("Task Added.")}</>}
						</div>

						<div className="relative">
							<button
								className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer"
								onClick={(ev) => {
									setaddFiltersPrams({
										...addFiltersPrams,
										show: !addFiltersPrams.show,
									});
								}}>
								<IconFilterCog />
							</button>
							{addFiltersPrams.show && (
								<Popover className="top-full mt-2 w-[450px] bg-white px-4 py-3 rounded-sm shadow-lg border border-gray-200">
									<div>
										<div className="flex justify-between my-4">
											<label htmlFor="" className="w-[150px]">
												{t("Status")}
											</label>
											<select
												name=""
												id=""
												className="border rounded-sm border-solid py-[3px] px-2 cursor-pointer"
												value={queryPrams?.status}
												onChange={(ev) => {
													setqueryPrams({
														...queryPrams,
														status: ev.target.value,
													});
												}}>
												<option value="">{t("Choose...")}</option>
												<option value="valid">{t("Valid")}</option>
												<option value="disposable">{t("disposable")}</option>
												<option value="invalidEmail">
													{t("invalidEmail")}
												</option>
												<option value="invalidDomain">
													{t("invalidDomain")}
												</option>
												<option value="syntaxNotValid">
													{t("syntaxNotValid")}
												</option>
											</select>
										</div>

										<div className="flex justify-between my-4">
											<label htmlFor="" className="w-[150px]">
												{t("Safe To Send")}
											</label>
											<select
												name=""
												id=""
												className="border rounded-sm border-solid py-[3px] px-2 cursor-pointer"
												value={queryPrams?.safeToSend}
												onChange={(ev) => {
													setqueryPrams({
														...queryPrams,
														safeToSend: ev.target.value,
													});
												}}>
												<option value="">Choose...</option>
												<option value="yes">yes</option>
												<option value="no">no</option>
											</select>
										</div>
										<div className="flex justify-between my-4">
											<label htmlFor="" className="w-[150px]">
												{t("Disposable Domain")}
											</label>
											<select
												name=""
												id=""
												className="border rounded-sm border-solid py-[3px] px-2 cursor-pointer"
												value={queryPrams?.isDisposableDomain}
												onChange={(ev) => {
													setqueryPrams({
														...queryPrams,
														isDisposableDomain: ev.target.value,
													});
												}}>
												<option value="">Choose...</option>
												<option value="yes">yes</option>
												<option value="no">no</option>
											</select>
										</div>
										<div className="flex justify-between my-4">
											<label htmlFor="" className="w-[150px]">
												{t("Valid Domain")}
											</label>
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
												<option value="">Choose...</option>
												<option value="yes">yes</option>
												<option value="no">no</option>
											</select>
										</div>
										<div className="flex justify-between my-4">
											<label htmlFor="" className="w-[150px]">
												{t("Free Email")}
											</label>
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
												<option value="">Choose...</option>
												<option value="yes">yes</option>
												<option value="no">no</option>
											</select>
										</div>
										<div className="flex justify-between my-4">
											<label htmlFor="" className="w-[150px]">
												{t("Gibberish Email")}
											</label>

											<select
												name=""
												id=""
												className="border rounded-sm border-solid py-[3px] px-2 cursor-pointer"
												value={queryPrams?.isGibberishEmail}
												onChange={(ev) => {
													setqueryPrams({
														...queryPrams,
														isGibberishEmail: ev.target.value,
													});
												}}>
												<option value="">Choose...</option>
												<option value="yes">yes</option>
												<option value="no">no</option>
											</select>
										</div>
										<div className="flex justify-between my-4">
											<label htmlFor="" className="w-[150px]">
												{t("SMTP Blacklisted")}
											</label>

											<select
												name=""
												id=""
												className="border rounded-sm border-solid py-[3px] px-2 cursor-pointer"
												value={queryPrams?.isSMTPBlacklisted}
												onChange={(ev) => {
													setqueryPrams({
														...queryPrams,
														isSMTPBlacklisted: ev.target.value,
													});
												}}>
												<option value="">Choose...</option>
												<option value="yes">yes</option>
												<option value="no">no</option>
											</select>
										</div>
										<div className="flex justify-between my-4">
											<label htmlFor="" className="w-[150px]">
												{t("Role Based")}
											</label>

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
												<option value="">Choose...</option>
												<option value="yes">yes</option>
												<option value="no">no</option>
											</select>
										</div>
										<div className="flex justify-between my-4">
											<label htmlFor="" className="w-[150px]">
												{t("Catch All Domain")}
											</label>
											<select
												name=""
												id=""
												className="border rounded-sm border-solid py-[3px] px-2 cursor-pointer"
												value={queryPrams?.isCatchAllDomain}
												onChange={(ev) => {
													setqueryPrams({
														...queryPrams,
														isCatchAllDomain: ev.target.value,
													});
												}}>
												<option value="">Choose...</option>
												<option value="yes">yes</option>
												<option value="no">no</option>
											</select>
										</div>
										<div className="flex justify-between my-4">
											<label htmlFor="" className="w-[150px]">
												{t("Verified SMTP")}
											</label>
											<select
												name=""
												id=""
												className="border rounded-sm border-solid py-[3px] px-2 cursor-pointer"
												value={queryPrams?.verifySMTP}
												onChange={(ev) => {
													setqueryPrams({
														...queryPrams,
														verifySMTP: ev.target.value,
													});
												}}>
												<option value="">Choose...</option>
												<option value="yes">yes</option>
												<option value="no">no</option>
											</select>
										</div>
									</div>
								</Popover>
							)}
						</div>
					</div>

					<div className="gap-2 flex items-center flex-wrap"></div>

					<div className="gap-2 flex items-center">
						<div className="relative">
							<button
								className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer"
								onClick={() => {
									setshowExport(!showExport);
								}}>
								<IconTableExport />
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
									{t("Export All")}
								</button>
								<button
									className="text-nowrap cursor-pointer px-3 py-[5px] w-full rounded-sm bg-gray-600 hover:bg-gray-500 text-white mt-2"
									onClick={() => {
										email_export();
									}}>
									{t("Export Selected")}
								</button>
							</div>
						</div>

						<button
							onClick={(ev) => {
								fetchPosts();
							}}
							className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer">
							<IconRefresh />
						</button>
						<div className="relative">
							<button
								onClick={(ev) => {
									setreportsPrams({
										...reportsPrams,
										show: !reportsPrams?.show,
									});
								}}
								className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer">
								<IconChartHistogram />
							</button>

							{reportsPrams.show && (
								<Popover className="top-full w-[500px] right-0 mt-2 bg-white px-4 py-3 rounded-sm border border-gray-200 text-gray-700 text-left">
									<div className="flex items-center mb-4 gap-3">
										<div
											className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer"
											onClick={(ev) => {
												get_task_report();
											}}>
											{t("Update")}
										</div>

										{loading && (
											<div>
												<Spinner />
											</div>
										)}
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>{t("Completed:")} {reportsPrams.completeCount}</div>
										<div>{t("Pending:")} {reportsPrams.pendingCount}</div>
										<div>{t("Total Not Safe To Send:")} {reportsPrams.safeToSend}</div>
										<div>
											{t("Total Syntax Invalid:")} {reportsPrams.isSyntaxValid}
										</div>
										<div>
											{t("Total Invalid Domain:")} {reportsPrams.hasValidDomain}
										</div>
										<div>{t("Total Invalid Email:")} {reportsPrams.isValidEmail}</div>
										<div>
											{t("Total Disposable Domain:")} {reportsPrams.isDisposableDomain}
										</div>
										<div>{t("Total Inbox Full:")} {reportsPrams.isInboxFull ?? 0}</div>
										<div>
											{t("Total Free Email Provider:")}{" "}
											{reportsPrams.isFreeEmailProvider ?? 0}
										</div>
										<div>
											{t("Total Gibberish Email:")}{" "}
											{reportsPrams.isGibberishEmail ?? 0}
										</div>
										<div>
											{t("Total SMTP Blacklisted:")}{" "}
											{reportsPrams.isSMTPBlacklisted ?? 0}
										</div>
										<div>
											{t("Total Role-Based Email:")}{" "}
											{reportsPrams.isRoleBasedEmail ?? 0}
										</div>
										<div>
											{t("Total Catch-All Domain:")}{" "}
											{reportsPrams.isCatchAllDomain ?? 0}
										</div>
										<div>{t("Total Verify SMTP:")} {reportsPrams.verifySMTP ?? 0}</div>
									</div>
								</Popover>
							)}
						</div>

						{selectedRows.length > 0 && (
							<div
								className="px-3 py-[5px] rounded-sm bg-red-600 hover:bg-red-500 text-white cursor-pointer"
								onClick={(ev) => {
									delete_tasks_entries();
								}}>
								{t("Delete Selected")}
							</div>
						)}
						<button className=" relative px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer">
							<div
								onClick={() => {
									setshowSetting(!showSetting);
								}}>
								<IconSettings />
							</div>

							{showSetting && (
								<Popover className="top-full w-[400px] right-0 mt-2 bg-white px-4 py-3 rounded-sm border border-gray-200 text-gray-700 text-left">
									<div>
										<label htmlFor="" className="my-3">
											{t("Title")}
										</label>
										<input
											type="text"
											className="border rounded-sm border-solid py-[3px] px-2 w-full cursor-pointer block"
											value={currentObject?.title}
											onChange={(ev) => {
												setcurrentObject({
													...currentObject,
													title: ev.target.value,
												});
											}}
										/>
									</div>

									<div className="flex items-center gap-2 my-4">
										<label htmlFor="">{t("Merge CSV file on Export?")}</label>
										<input
											type="checkbox"
											value={""}
											checked={currentObject.mergeCSV ? true : false}
											onChange={(ev) => {
												setcurrentObject({
													...currentObject,
													mergeCSV: !currentObject.mergeCSV,
												});
											}}
										/>
									</div>
									<div className="flex items-center gap-2 my-4">
										<label htmlFor="">
											{t("Send Webhhok Request on Validation?")}
										</label>
										<input
											type="checkbox"
											value={""}
											checked={currentObject.sendWebhook ? true : false}
											onChange={(ev) => {
												setcurrentObject({
													...currentObject,
													sendWebhook: !currentObject.sendWebhook,
												});
											}}
										/>
									</div>

									<div
										className={`${currentObject.sendWebhook ? "" : "hidden"}`}>
										<label htmlFor="" className="my-3">
											{t("Webhook URL")}
										</label>
										<input
											type="text"
											className="border rounded-sm border-solid py-[3px] px-2 w-full cursor-pointer block"
											value={currentObject?.webhookUrl}
											onChange={(ev) => {
												setcurrentObject({
													...currentObject,
													webhookUrl: ev.target.value,
												});
											}}
										/>
									</div>
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
