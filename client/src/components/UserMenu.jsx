import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";

function UserMenu({ closeMenu }) {
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");

    //  FETCH USER FIRST (run once)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.post("/user/me");

                if (res.data.success) {
                    setEmail(res.data.email);

                    // fetch admin AFTER email is known
                    const adminRes = await api.post("/user/check-admin", {
                        email: res.data.email,
                    });

                    setIsAdmin(adminRes.data.isAdmin);
                }
            } catch (error) {
                console.log(error);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logoutHandle = async () => {
        try {
            await api.get("/user/logout", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return (
            <div className="w-48 sm:w-56 bg-white shadow-xl rounded-xl p-4 border">
                <p className="text-center text-gray-500 text-sm">Loading...</p>
            </div>
        );
    }

    return (
        <div
            className="
      w-48 sm:w-56 md:w-64
      bg-white shadow-xl
      rounded-xl sm:rounded-2xl
      p-3 sm:p-4
      border border-gray-100
    "
        >
            {/* Account Info */}
            <div className="mb-3">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">
                        My Account
                    </p>

                    <Link
                        to="/dashboard"
                        onClick={closeMenu}
                        className="hover:opacity-50"
                    >
                        <span className="hidden md:block">
                            <FaExternalLinkAlt size={12} />
                        </span>
                    </Link>
                </div>

                <p className="text-xs text-gray-500 truncate mt-1">{email}</p>
            </div>

            <hr className="my-2" />

            {/* Menu Items */}
            <div className="flex flex-col gap-1">
                {isAdmin && (
                    <>
                        <Link
                            className="menu-item"
                            to="/dashboard/category"
                            onClick={closeMenu}
                        >
                            Category
                        </Link>

                        <Link
                            className="menu-item"
                            to="/dashboard/sub-category"
                            onClick={closeMenu}
                        >
                            Sub Category
                        </Link>

                        <Link
                            className="menu-item"
                            to="/dashboard/upload-product"
                            onClick={closeMenu}
                        >
                            Upload Product
                        </Link>

                        <Link
                            className="menu-item"
                            to="/dashboard/product"
                            onClick={closeMenu}
                        >
                            Product
                        </Link>
                    </>
                )}

                <Link
                    className="menu-item"
                    to="/dashboard/myorders"
                    onClick={closeMenu}
                >
                    Orders
                </Link>

                <Link
                    className="menu-item"
                    to="/dashboard/address"
                    onClick={closeMenu}
                >
                    Addresses
                </Link>

                <button
                    onClick={logoutHandle}
                    className="
            text-left px-2 py-2
            text-sm text-red-600
            hover:bg-red-50
            rounded-lg
            transition
          "
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default UserMenu;
