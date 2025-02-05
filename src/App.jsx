import { Routes, Route } from 'react-router-dom';
import Licenses from './pages/Licenses';
import LicenseDetail from './pages/LicenseDetail';
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Subscriptions from "./pages/Subscriptions";
import SubscriptionDetail from "./pages/SubscriptionDetail";
import Home from './pages/Home';
import './index.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/licenses" element={<Licenses />} />
      <Route path="/licenses/:id" element={<LicenseDetail />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<OrderDetail />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/subscriptions/:id" element={<SubscriptionDetail />} />
    </Routes>
  );
}

export default App;
