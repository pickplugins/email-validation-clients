import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import Layout from "../components/Layout";
import UserAccount from "../components/UserAccount";
import GlobalHeader from "../components/GlobalHeader";
import UserProfileEdit from "../components/UserProfileEdit";
import Login from '../pages/Login';

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  //if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-gray-200">
      {token ? (


        <Layout>

          {user == null && (
            <p>Loading...</p>
          )}
          {user && (
            <div className="p-5">

              <UserProfileEdit user={user} />
            </div>
          )}


        </Layout>

      ) : (
        <div>
          <h2>Login</h2>

          <Login /></div>
      )}
    </div>
  );
};

export default Dashboard;
