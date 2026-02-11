import React, { useState, useEffect } from "react";
import useLoginStore from "../zustand/loginStore";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function UserMenu() {
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("accessToken");

  const data = token ? jwtDecode(token) : "hghh";
  console.log(token);
  const id = data.id;
  console.log("pasasas", id);
  useEffect(() => {
    api
      .post("/user/me", { id })
      .then((res) => setEmail(res.data.email))
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const logoutHandle = async () => {
    await api
      .get("/user/logout")
      .then((response) => {
        if (response.data.success == true) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          console.log("successfully loggedout");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
  className="
    absolute
    right-2
    top-14
    sm:right-0
    sm:top-12
    w-56
    bg-white
    shadow-xl
    rounded-2xl
    p-4
    sm:p-5
    border
    border-gray-100
    z-50
  "
>

      {/* Account Info */}
      <div className="mb-2">
        <p className="text-sm font-semibold text-gray-900">
          My Account
        </p>
        <p className="text-xs sm:text-sm text-gray-500 truncate">
          {email}
        </p>
      </div>

      <hr className="my-3" />

      {/* Menu Items */}
      <button
        className="
          block
          w-full
          text-left
          py-2
          px-2
          rounded-lg
          text-sm
          hover:bg-gray-100
          transition
        "
      >
        Orders
      </button>

      <button
        className="
          block
          w-full
          text-left
          py-2
          px-2
          rounded-lg
          text-sm
          hover:bg-gray-100
          transition
        "
      >
        Addresses
      </button>

      <button
        onClick={logoutHandle}
        className="
          block
          w-full
          text-left
          py-2
          px-2
          rounded-lg
          text-sm
          text-red-600
          hover:bg-red-50
          transition
        "
      >
        Logout
      </button>
    </div>
  );
}

export default UserMenu;
