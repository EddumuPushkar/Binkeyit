import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
// import Header from "../components/Header";
// import Footer from "../components/footer";
import SearchPage from "../pages/SearchPage.jsx";
import Login1 from "../pages/Login1.jsx";
import UserMenuMobile from "../pages/UserMenuMobile.jsx.jsx";
import Dashboard from "../layouts/Dashboard.jsx";
import Myorders from "../pages/Myorders.jsx";
import Address from "../pages/Address.jsx";
import CategoryPage from "../pages/CategoryPage.jsx";
import SubCatageryPage from "../pages/SubCategoryPage.jsx";
import ProductPage from "../pages/ProductPage.jsx";
import UploadProductPage from "../pages/UploadProductPage.jsx";

//These all are frontend routes and we will use them in App.jsx file

// const router = createBrowserRouter([
//     {
//         path : "/",
//         element : <App/>,
//         children : [
//             {
//                 path : "",
//                 element : <Home/>
//             }
//         ]
//     }
// ])
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      <Route path="" element={<Home />} />

      <Route path="search" element={<SearchPage />} />

      <Route path="login" element={<Login1 />} />

      <Route path="UserMenuMobile" element={<UserMenuMobile />} />
      
      <Route path="dashboard" element={<Dashboard />}>

        <Route path="myorders" element={<Myorders />} />

        <Route path="address" element={<Address />} />

        <Route path="category" element={<CategoryPage />} />

        <Route path="sub-category" element={<SubCatageryPage />} />

        <Route path="product" element={<ProductPage />} />

        <Route path="upload-product" element={<UploadProductPage />} />
      </Route>
    </Route>,
  ),
);

export default router;
