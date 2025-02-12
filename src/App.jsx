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


  






  return (
		<AuthProvider>
			<Routes>
				<Route path="/" element={<Dashboard user={userData} />} />
				<Route path="/app" element={<Dashboard user={userData} />} />
				<Route
					path="/apikeys"
					element={
						<PrivateRoute>
							<ApiKeys user={userData} />
						</PrivateRoute>
					}
				/>
				<Route
					path="/validationrequests"
					element={
						<PrivateRoute>
							<ValidationRequests user={userData} />
						</PrivateRoute>
					}
				/>
				<Route
					path="/credits"
					element={
						<PrivateRoute>
							<Credits user={userData} />
						</PrivateRoute>
					}
				/>
				<Route
					path="/licenses"
					element={
						<PrivateRoute>
							<Licenses user={userData} />
						</PrivateRoute>
					}
				/>
				<Route
					path="/licenses/:id"
					element={
						<PrivateRoute>
							<LicenseDetail user={userData} />
						</PrivateRoute>
					}
				/>
				<Route
					path="/orders"
					element={
						<PrivateRoute>
							<Orders user={userData} />
						</PrivateRoute>
					}
				/>
				<Route
					path="/tasks"
					element={
						<PrivateRoute>
							<Tasks user={userData} />
						</PrivateRoute>
					}
				/>
				<Route
					path="/tasks/:id"
					element={
						<PrivateRoute>
							<TaskDetail user={userData} />
						</PrivateRoute>
					}
				/>
				<Route
					path="/orders/:id"
					element={
						<PrivateRoute>
							<OrderDetail user={userData} />
						</PrivateRoute>
					}
				/>
				<Route
					path="/products"
					element={
						<PrivateRoute>
							<Products user={userData} />
						</PrivateRoute>
					}
				/>
				<Route
					path="/products/:id"
					element={
						<PrivateRoute>
							<ProductDetail user={userData} />
						</PrivateRoute>
					}
				/>
				<Route
					path="/subscriptions"
					element={
						<PrivateRoute>
							<Subscriptions user={userData} />
						</PrivateRoute>
					}
				/>
				<Route
					path="/subscriptions/:id"
					element={
						<PrivateRoute>
							<SubscriptionDetail user={userData} />
						</PrivateRoute>
					}
				/>
				<Route
					path="/dashboard"
					element={
						<PrivateRoute>
							<Dashboard user={userData} />
						</PrivateRoute>
					}
				/>
			</Routes>
		</AuthProvider>
	);
}

export default App;
