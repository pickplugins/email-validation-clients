import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import Layout from "../components/Layout";
import UserAccount from "../components/UserAccount";
import GlobalHeader from "../components/GlobalHeader";
import UserProfileEdit from "../components/UserProfileEdit";
import Login from '../components/Login';
import Register from '../components/Register';
import { useState, useEffect } from "react";
import ChartComponent from "../components/ChartComponent";
import {
	IconBasketCheck,
	IconClipboardList,
	IconMailSpark,
	IconCloudDataConnection,
	IconDashboard,
	IconCalculator,
	IconLayoutSidebarLeftCollapse,
	IconLayoutSidebarRightCollapse,
	IconRotateRectangle,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
const Dashboard = () => {
	const { userData, token, t } = useContext(AuthContext);
	// const token = localStorage.getItem("token");

	var [appData, setappData] = useState(window.appData);
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", limit: 10, first_date: "", last_date: "" });
	var [loading, setloading] = useState(false);
	var [chartEntries, setchartEntries] = useState([]);
	var [statsData, setstatsData] = useState({});

	useEffect(() => {
		fetchPosts()
	}, []);



	function fetchPosts() {

		const token = localStorage.getItem("token");

		if (!token) {
			//throw new Error("No token found");
			return;
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

		fetch(appData.serverUrl + "wp-json/email-validation/v2/get_chart_data", {
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
						setchartEntries(res.items)
						setloading(false);


						setstatsData({
							total_email_validated: res.total_email_validated,
							total_task: res.total_task,
							total_orders: res.total_orders,
							count_total_credit: res.count_total_credit,
							count_total_credit_used: res.count_total_credit_used,
							total_api_validation: res.total_api_validation,
						})

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


	return (
		<Layout>
			{!userData && (
				<div className="grid grid-cols-2 md:grid-cols-1 gap-20 w-[1200px] px-10 mx-auto mt-10">
					<div>
						<h2 className="my-5 text-2xl">{t("Register")}</h2>

						<Register />
					</div>
					<div>
						<h2 className="my-5 text-2xl">{t("Login")}</h2>

						<Login />
					</div>
				</div>
			)}
			{userData && (
				<div className="p-5">

					<div className=" grid gap-4 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 text-white">
						<div className="bg-blue-500 p-3 rounded-sm">
							<div className="flex items-center gap-3">
								<div className="w-[50px]">
									<IconClipboardList size="40" />
								</div>
								<div>
									<div className="text-md">{t("Total Task")}</div>
									<div className="text-3xl">{statsData?.total_task}</div>
								</div>
							</div>
						</div>
						<div className="bg-blue-500 p-3 rounded-sm">
							<div className="flex items-center gap-3">
								<div className="w-[50px]">
									<IconMailSpark size="40" />
								</div>
								<div>
									<div className="text-md">{t("Total Email Validated")}</div>
									<div className="text-3xl">{statsData?.total_email_validated}</div>
								</div>
							</div>
						</div>
						<div className="bg-blue-500 p-3 rounded-sm">
							<div className="flex items-center gap-3">
								<div className="w-[50px]">
									<IconCloudDataConnection size="40" />
								</div>
								<div>
									<div className="text-md">{t("Total API Keys")}</div>
									<div className="text-3xl">{statsData?.total_api_keys}</div>
								</div>
							</div>
						</div>
						<div className="bg-blue-500 p-3 rounded-sm">
							<div className="flex items-center gap-3">
								<div className="w-[50px]">
									<IconBasketCheck size="40" />
								</div>
								<div>
									<div className="text-md">{t("Total Orders")}</div>
									<div className="text-3xl">{statsData?.total_orders}</div>
								</div>
							</div>
						</div>
						<div className="bg-blue-500 p-3 rounded-sm">
							<div className="flex items-center gap-3">
								<div className="w-[50px]">
									<IconCalculator size="40" />
								</div>
								<div>
									<div className="text-md">{t("Total Credits Used")}</div>
									<div className="text-3xl">{statsData?.count_total_credit_used?.cron + statsData?.count_total_credit_used?.api}</div>
								</div>
							</div>
						</div>
					</div>

					<div>
						<div className="text-3xl mt-5">{t("Last 7 Days Stats")}</div>

						<ChartComponent entries={chartEntries} />
					</div>
				</div>
			)}
		</Layout>
	);
};

export default Dashboard;
