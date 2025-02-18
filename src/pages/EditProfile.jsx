import React, { useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import Layout from "../components/Layout";
import Login from "../components/Login";
import Register from "../components/Register";
import UserProfileEdit from "../components/UserProfileEdit";

const EditProfile = () => {
	const { userData, token, t } = useContext(AuthContext);
	// const token = localStorage.getItem("token");

	var [appData, setappData] = useState(window.appData);

	// useEffect(() => {
	//   setappData(window.appData)
	// }, [window.appData]);

	return (
		<Layout>
			{token ? (
				<div className="">
					{userData && (
						<div className="p-5">
							<UserProfileEdit />
						</div>
					)}
				</div>
			) : (
				<div className="grid grid-cols-2 gap-20 w-[1200px] px-10 mx-auto mt-10">
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
		</Layout>
	);
};

export default EditProfile;
