import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios.js";
import useSearchStore from "../zustand/useSearchStore.js";
import ProductSearch from "../components/ProductSearch.jsx";
import ProductListPage from "./productListPage.jsx";

function SearchPage() {
  const location = useLocation();

  // const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { results} = useSearchStore();

  // const query = new URLSearchParams(location.search).get("q");

  // useEffect(() => {
  //   if (!query || !query.trim()) return;

  //   const fetchResults = async () => {
  //     try {
  //       setLoading(true);

  //       // const res = await api.get(`/user/search?q=${query}`);

  //       // //  FIX HERE
  //       // setResults(res.data.data || []);

  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchResults();
  // }, [query]);

  return (
  <div className="bg-gray-100 min-h-screen py-3">
    <div className="max-w-[1200px] mx-auto">

      {loading && <p>Loading...</p>}

      {!loading && results.length === 0 && (
        <p>No results found</p>
      )}

      <div className="flex flex-wrap gap-2">
        {results.map((item) => (
          <ProductSearch item={item} />
        ))}
      </div>

    </div>
  </div>
);
}

export default SearchPage;