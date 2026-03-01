import React, { useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import { useEffect } from "react";
import Loading from "../components/loading";
import api from "../api/axios";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await api.get("/category/get-category");
      if (response.data.success) {
        setCategoryData(response.data.data);
      }
      // console.log("abcd", response.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Category</h2>

        <button
          onClick={() => setOpenUploadCategory(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl shadow-md transition"
        >
          + Add Category
        </button>
      </div>

      {categoryData.length === 0 && !loading && (
        <div className="text-center py-10">
          <p className="text-gray-500">No categories available</p>
        </div>
      )}
      {
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {categoryData.map((category) => (
            <div
              key={category._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 w-[140px] flex flex-col items-center text-center cursor-pointer"
            >
              {/* Image */}
              <div className="w-24 h-24 flex items-center justify-center mb-3">
                <img
                  src={category.image}
                  alt={category.name}
                  className="max-h-full object-contain"
                />
              </div>

              {/* Text */}
              <p className="text-sm font-medium text-gray-800 text-center whitespace-normal break-all">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      }
      {loading && <Loading />}

      {openUploadCategory && (
        <UploadCategoryModel close={() => setOpenUploadCategory(false)} />
      )}
    </section>
  );
};

export default CategoryPage;
