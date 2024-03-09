import {Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import PageNotFound from "./Pages/PageNotFound";
import Login from "./Pages/Auth/Login";
import Registration from "./Pages/Auth/Registration";
import Dashboard from "./Pages/user/Dashboard";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./Components/Routes/privateRoute";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminRoute from "./Components/Routes/AdminRoute";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Users from "./Pages/Admin/Users";
import Profile from "./Pages/user/Profile";
import Order from "./Pages/user/Order";
import Products from "./Pages/Admin/Products";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import SearchPage from "./Pages/SearchPage";
import ProductDetails from "./Pages/ProductDetails";
import Main from "./Pages/Main/Main";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Order />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/products" element={<Products />} />
        </Route>
        <Route path="/register" element={<Registration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
