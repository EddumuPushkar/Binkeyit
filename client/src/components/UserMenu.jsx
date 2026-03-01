import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";

import { jwtDecode } from "jwt-decode";

function UserMenu({ closeMenu }) {
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  // const email = useLoginStore((state) => state.email);

  const token = localStorage.getItem("accessToken");

  // const data = token ? jwtDecode(token) : "hghh";
  // // console.log(token);
  // const id = data.id;

  useEffect(() => {
    if (!email) return;
    console.log("adsasdasddadsd");

    const checkAdmin = async () => {
      try {
        const response = await api.post("/user/check-admin", { email });
        setIsAdmin(response.data.isAdmin);
        console.log("res.data.isAdmin", response.data.isAdmin);
      } catch (error) {
        console.log(error);
        setIsAdmin(false);
      }
      finally{
        setLoading(false)
      }
    };
    checkAdmin();
  }, [email]);

  useEffect(() => {
    const fun = async () => {
      try {
        const res = await api.post("/user/me");
        if (res.data.success) {
          setEmail(res.data.email);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fun();
  }, [email]);

  const navigate = useNavigate();

  const logoutHandle = async () => {
    await api
      .get("/user/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
  if (loading) {
    return (
      <div className="w-56 bg-white shadow-xl rounded-2xl p-4 border border-gray-100">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  return isAdmin ? (
    <div className="w-56 bg-white shadow-xl rounded-2xl p-4 border border-gray-100">
      {/* Account Info */}
      <div className="mb-2 ">
        <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          My Account
          <Link
            to={"/dashboard"}
            onClick={closeMenu}
            className="hover:opacity-40"
          >
            <FaExternalLinkAlt size={12} />
          </Link>
        </p>

        <p className="text-xs sm:text-sm text-gray-500 truncate">{email}</p>
      </div>

      <hr className="my-3" />

      {/* Menu Items */}

      <Link
        to={"/dashboard/category"}
        onClick={closeMenu}
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
        Category
      </Link>
      <Link
        to={"/dashboard/sub-category"}
        onClick={closeMenu}
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
        Sub Category
      </Link>
      <Link
        to={"/dashboard/upload-product"}
        onClick={closeMenu}
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
        Upload Product
      </Link>
      <Link
        to={"/dashboard/product"}
        onClick={closeMenu}
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
        Product
      </Link>

      <Link
        to={"/dashboard/myorders"}
        onClick={closeMenu}
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
      </Link>

      <Link
        to={"/dashboard/address"}
        onClick={closeMenu}
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
      </Link>

      <Link
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
      </Link>
    </div>
  ) : (
    <div className="w-56 bg-white shadow-xl rounded-2xl p-4 border border-gray-100">
      {/* Account Info */}
      <div className="mb-2 ">
        <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          My Account
          <Link
            to={"/dashboard"}
            onClick={closeMenu}
            className="hover:opacity-40"
          >
            <FaExternalLinkAlt size={12} />
          </Link>
        </p>

        <p className="text-xs sm:text-sm text-gray-500 truncate">{email}</p>
      </div>

      <hr className="my-3" />

      {/* Menu Items */}

      <Link
        to={"/dashboard/myorders"}
        onClick={closeMenu}
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
      </Link>

      <Link
        to={"/dashboard/address"}
        onClick={closeMenu}
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
      </Link>

      <Link
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
      </Link>
    </div>
  );
}

export default UserMenu;
