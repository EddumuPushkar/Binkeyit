import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { IoSearch } from "react-icons/io5";

function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSearchPage, setIsSearchPage] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };
  console.log("search", isSearchPage);
  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-12 rounded-lg border border-gray-300 bg-white flex items-center px-3 focus-within:border-primary-100 focus-within:shadow-sm transition-all text-neutral-500">
      <div>
        {isMobile && isSearchPage ? (
          <Link
            to={"/"}
            className=" text-neutral-500 hover:text-primary-100 transition-colors"
          >
            <FaArrowLeft size={16} />
          </Link>
        ) : (
          <button
            onClick={redirectToSearchPage}
            className="h-full flex items-center justify-center text-neutral-500 hover:text-primary-100 transition-colors"
          >
            <IoSearch size={18} />
          </button>
        )}
      </div>
      <div className="w-full h-full pl-3">
        {!isSearchPage ? (
          //not in search page
          <div
            onClick={redirectToSearchPage}
            className="ml-3 text-neutral-500 text-sm select-none w-full h-full flex justify-center items-center"
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Search "milk"  ',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Search "butter" ',
                1000,
                'Search "paneer" ',
                1000,
                'Search "curd" ',
                1000,
                'Search "sugar" ',
                1000,
                'Search "egg" ',
                1000,
                'Search "rice" ',
                1000,
                'Search "bread" ',
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: "1em", display: "inline-block" }}
              repeat={Infinity}
            />
          </div>
        ) : (
          //i am in search page
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search for atta, dal and more."
              autoFocus={true}
              className="bg-transparent w-full h-full outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
