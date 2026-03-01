import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";

//UserMenuMobile

function UserMenuMobile() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  let id = null;

  if (token) {
    const decoded = jwtDecode(token);
    id = decoded.id;
  }

  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("accessToken");

    api
      .post(
        "/user/me",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => setEmail(res.data.email))
      .catch((err) => {
        console.log(err);

        if (err.response?.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/");
        }
      });
  }, [id]);

  const logoutHandle = async () => {
    await api.get("/user/logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };
  const goto = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 relative">
      {/* Close button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 p-2 text-gray-600 hover:text-black"
      >
        <ImCross size={18} />
      </button>

      <h1 className="text-xl font-semibold mb-6 flex items-center">
        <span>My Account</span>

        <Link to={"/dashboard"} className="ml-2 hover:opacity-40">
          <FaExternalLinkAlt size={14} />
        </Link>
      </h1>

      <div className="bg-white rounded-xl p-4 shadow mb-4">
        <p className="text-sm text-gray-500">Signed in as</p>
        <p className="font-medium">{email}</p>
      </div>

      <div className="bg-white rounded-xl shadow divide-y">
        <button className="w-full text-left p-4">Orders</button>
        <button className="w-full text-left p-4">Addresses</button>
        <button
          onClick={logoutHandle}
          className="w-full text-left p-4 text-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserMenuMobile;
