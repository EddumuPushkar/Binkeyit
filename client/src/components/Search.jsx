import React, { useEffect, useState, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { IoSearch } from "react-icons/io5";
import api from "../api/axios";
import useSearchStore from "../zustand/useSearchStore.js";

function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMobile();

    const [isSearchPage, setIsSearchPage] = useState(false);

    const [query, setQuery] = useState("");
    const {setResults} = useSearchStore();

    const abortRef = useRef(null);

    useEffect(() => {
        setIsSearchPage(location.pathname === "/search");
    }, [location]);

    // debounce
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const timer = setTimeout(() => {
            fetchResults();
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const fetchResults = async () => {
        try {
            if (abortRef.current) {
                abortRef.current.abort();
            }

            const controller = new AbortController();
            abortRef.current = controller;

            const res = await api.get(`/user/search?q=${query}`);

            //  FIX HERE
            setResults(res.data.data || []);

        } catch (err) {
            if (err.name !== "CanceledError") {
                console.log(err);
            }
        }
    };

    const redirectToSearchPage = () => {
        if (!query.trim()) return;
        setShowDropdown(false);
        navigate(`/search?q=${query}`);
    };

    return (
        <div className="w-full max-w-full sm:max-w-md lg:max-w-xl h-11 sm:h-12 rounded-lg border border-gray-300 bg-white flex items-center px-2 sm:px-3 relative">

            {/* Icon */}
            <div className="flex items-center">
                {isMobile && isSearchPage ? (
                    <Link to="/" className="p-1">
                        <FaArrowLeft size={16} />
                    </Link>
                ) : (
                    <button onClick={redirectToSearchPage} className="p-1">
                        <IoSearch size={18} />
                    </button>
                )}
            </div>

            {/* Input */}
            <div className="flex-1 pl-2 flex items-center relative">
                {!isSearchPage ? (
                    <div
                        onClick={() => navigate("/search")}
                        className="w-full text-sm cursor-pointer"
                    >
                        <TypeAnimation
                            sequence={[
                                'Search "milk"', 1000,
                                'Search "butter"', 1000,
                                'Search "paneer"', 1000,
                            ]}
                            speed={50}
                            repeat={Infinity}
                        />
                    </div>
                ) : (
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        // onFocus={() => results.length > 0 && setShowDropdown(true)}
                        placeholder="Search for atta, dal and more..."
                        // autoFocus
                        className="w-full outline-none text-sm"
                    />
                )}

                {/* Dropdown */}
                {/* {showDropdown && results.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md z-50 mt-1 max-h-60 overflow-y-auto">
                        {results.map((item) => (
                            <div
                                key={item._id}
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => {
                                    setQuery(item.name);
                                    setShowDropdown(false);
                                    navigate(`/search?q=${item.name}`);
                                }}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                )} */}
            </div>
        </div>
    );
}

export default Search;