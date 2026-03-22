import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import UserMenu from "../components/UserMenu";

//UserMenuMobile

function UserMenuMobile() {
  // const [email, setEmail] = useState("");
  // const navigate = useNavigate();

  // const token = localStorage.getItem("accessToken");
  // let id = null;

  // if (token) {
  //   const decoded = jwtDecode(token);
  //   id = decoded.id;
  // }

  // useEffect(() => {
  //   if (!id) return;

  //   const token = localStorage.getItem("accessToken");

  //   api
  //     .post(
  //       "/user/me",
  //       { id },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     )
  //     .then((res) => setEmail(res.data.email))
  //     .catch((err) => {
  //       console.log(err);

  //       if (err.response?.status === 401) {
  //         localStorage.removeItem("accessToken");
  //         localStorage.removeItem("refreshToken");
  //         navigate("/");
  //       }
  //     });
  // }, [id]);

  // const logoutHandle = async () => {
  //   await api.get("/user/logout");
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("refreshToken");
  //   navigate("/");
  // };
  // const goto = () => {
  //   navigate(-1);
  // };

  return (
    <div className="min-h-screen bg-gray-50 p-4 relative">
      <UserMenu/>
    </div>
  );
}
export default UserMenuMobile;
