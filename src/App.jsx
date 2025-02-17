// import { useState, useEffect, Component } from "react";

import { Routes, Route } from 'react-router-dom';
import Credits from './pages/Credits';
import CreditsLogs from './pages/CreditsLogs';
import Licenses from './pages/Licenses';
import LicenseDetail from './pages/LicenseDetail';
import Orders from "./pages/Orders";
import Tasks from "./pages/Tasks";
import TaskDetail from "./pages/TaskDetail";
import OrderDetail from "./pages/OrderDetail";
import Subscriptions from "./pages/Subscriptions";
import SubscriptionDetail from "./pages/SubscriptionDetail";
import ApiKeys from "./pages/ApiKeys";
import ValidationRequests from "./pages/ValidationRequests";
// import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import EditProfile from './pages/EditProfile';
import PrivateRoute from './pages/PrivateRoute';
import AuthProvider from './components/AuthContext';



import './index.css'

function App() {


  // var [userData, setuserData] = useState(null);
  // var [appData, setappData] = useState(window.appData);




  console.log(import.meta.env);





  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/app" element={<Dashboard />} />
        <Route
          path="/apikeys"
          element={
            <PrivateRoute>
              <ApiKeys />
            </PrivateRoute>
          }
        />
        <Route
          path="/editprofile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/validationrequests"
          element={
            <PrivateRoute>
              <ValidationRequests />
            </PrivateRoute>
          }
        />
        <Route
          path="/credits"
          element={
            <PrivateRoute>
              <Credits />
            </PrivateRoute>
          }
        />
        <Route
          path="/creditslogs"
          element={
            <PrivateRoute>
              <CreditsLogs />
            </PrivateRoute>
          }
        />


        <Route
          path="/licenses"
          element={
            <PrivateRoute>
              <Licenses />
            </PrivateRoute>
          }
        />
        <Route
          path="/licenses/:id"
          element={
            <PrivateRoute>
              <LicenseDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <PrivateRoute>
              <TaskDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <PrivateRoute>
              <OrderDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <PrivateRoute>
              <Subscriptions />
            </PrivateRoute>
          }
        />
        <Route
          path="/subscriptions/:id"
          element={
            <PrivateRoute>
              <SubscriptionDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
