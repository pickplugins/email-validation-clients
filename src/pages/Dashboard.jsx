import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import Layout from "../components/Layout";
import UserAccount from "../components/UserAccount";
import GlobalHeader from "../components/GlobalHeader";
import UserProfileEdit from "../components/UserProfileEdit";
import Login from '../pages/Login';
import Register from '../pages/Register';
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  var [appData, setappData] = useState(window.appData);

  // useEffect(() => {
  //   setappData(window.appData)
  // }, [window.appData]);

  return (
    <Layout >
      {token ? (


        <div className="bg-gray-200">
          {user && (
            <div className="p-5">

              <UserProfileEdit user={user} />
            </div>
          )}


        </div>

      ) : (


        <div className="grid grid-cols-2 gap-10 w-[1200px] px-10 mx-auto mt-10">
          <div>
            <h2 className="my-5 text-2xl">Register</h2>

            <Register />
          </div>
          <div>
            <h2 className="my-5 text-2xl">Login</h2>

            <Login />
          </div>

        </div>


      )}
    </Layout>
  );
};

export default Dashboard;
