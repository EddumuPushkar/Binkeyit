import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { BsCart3 } from "react-icons/bs";
import { VscTriangleDown } from "react-icons/vsc";
import UserMenu from "./UserMenu.jsx";

function Header() {
  const isMobile = useMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const isSearchPage = location.pathname === "/search";
  const isLoggedin = Boolean(localStorage.getItem("accessToken"));

  const redirectToLoginPage = () => navigate("/login");
  const redirectToMePage = () => {
    if(isMobile){
      navigate("/me");
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      {/* Hide header on mobile search page */}
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center justify-between h-20 px-4 lg:px-8">
          
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="logo"
              className="h-9 lg:h-10 w-auto object-contain"
            />
          </Link>

          {/* Search (desktop only) */}
          <div className="hidden lg:flex flex-1 justify-center max-w-xl px-6">
            <Search />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 shrink-0">

            {/* 🔹 MOBILE USER ICON ONLY */}
            <button
              onClick={() =>
                isLoggedin ? redirectToMePage() : redirectToLoginPage()
              }
              className="lg:hidden text-neutral-600"
            >
              <FaUserCircle size={26} />
            </button>

            {/* 🔹 DESKTOP ONLY */}
            <div className="hidden lg:flex items-center gap-6 text-sm text-neutral-700">
              {isLoggedin ? (
                <div className="relative">
                  <button
                    onClick={() => setShowMenu((prev) => !prev)}
                    className="flex items-center gap-2 hover:text-primary-100"
                  >
                    <span>Account</span>
                    <VscTriangleDown />
                  </button>

                  {showMenu && (
                    <>
                      {/* Overlay */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowMenu(false)}
                      />

                      {/* Dropdown */}
                      <div className="absolute right-0 top-10 z-50">
                        <UserMenu />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLoginPage}
                  className="text-lg px-6 hover:text-primary-100 transition-colors"
                >
                  Login
                </button>
              )}

              {/* Cart */}
              <button className="group flex items-center gap-3 px-5 py-3.5 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors shadow-md">
                <BsCart3 size={18} className="group-hover:animate-bounce" />
                <span className="text-sm font-medium">My Cart</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search */}
      <div className="lg:hidden px-4 py-4 bg-white">
        <Search />
      </div>
    </header>
  );
}

export default Header;
