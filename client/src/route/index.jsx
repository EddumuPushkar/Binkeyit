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
import Me from "../pages/Me.jsx";

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
      <Route path="me" element={<Me />} />
    </Route>,
  ),
);

export default router;
