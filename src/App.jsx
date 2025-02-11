import { useState, useEffect, Component } from "react";

import { Routes, Route } from 'react-router-dom';
import Credits from './pages/Credits';
import Licenses from './pages/Licenses';
import LicenseDetail from './pages/LicenseDetail';
import Orders from "./pages/Orders";
import Tasks from "./pages/Tasks";
import TaskDetail from "./pages/TaskDetail";
import OrderDetail from "./pages/OrderDetail";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Subscriptions from "./pages/Subscriptions";
import SubscriptionDetail from "./pages/SubscriptionDetail";
import ApiKeys from "./pages/ApiKeys";
import ValidationRequests from "./pages/ValidationRequests";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './pages/PrivateRoute';
import AuthProvider from './components/AuthContext';



import './index.css'

function App(appData) {


  var [userData, setuserData] = useState(null);
  var [appData, setappData] = useState(window.appData);


  function fetchUser() {

    const token = localStorage.getItem("token");

    if (!token) {

      return;
      //throw new Error("No token found");
    }


    var postData = {

    };
    postData = JSON.stringify(postData);

    fetch(appData.serverUrl + "wp-json/email-validation/v2/get_user", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: postData,
    })
      .then((response) => {

        if (response.status == 429) {
          setloading(false);

          throw new Error('Too Many Requests');
        }
        if (!response.ok) {
          throw new Error('Token validation failed');
        }

        if (response.ok && response.status < 400) {
          response.json().then((res) => {


            setuserData(res.user);
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

    fetchUser();
  }, []);








  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Dashboard user={userData} />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/apikeys" element={<PrivateRoute><ApiKeys /></PrivateRoute>} />
        <Route path="/validationrequests" element={<PrivateRoute><ValidationRequests /></PrivateRoute>} />
        <Route path="/credits" element={<PrivateRoute><Credits /></PrivateRoute>} />
        <Route path="/licenses" element={<PrivateRoute><Licenses /></PrivateRoute>} />
        <Route path="/licenses/:id" element={<PrivateRoute><LicenseDetail /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
        <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
        <Route path="/tasks/:id" element={<PrivateRoute><TaskDetail /></PrivateRoute>} />
        <Route path="/orders/:id" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path="/products/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
        <Route path="/subscriptions" element={<PrivateRoute><Subscriptions /></PrivateRoute>} />
        <Route path="/subscriptions/:id" element={<PrivateRoute><SubscriptionDetail /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </AuthProvider>

  );
}

export default App;
