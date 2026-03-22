import React, { useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import { useEffect } from "react";
import Loading from "../components/loading";
import api from "../api/axios";


const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
  const deleteCategory = async (categoryId) => {
    try{
      setLoading(true);
      if(!categoryId){
        alert("Category ID is required for deletion");
        return;
      }
      await api.delete("/category/delete-category", { data: { categoryId } });
      fetchCategory();
    }
    catch(error){
      console.log("DeleteError:", error.response?.data);
    }
  }
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categoryData.map((category) => (
            <div
              key={category._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 flex items-center justify-center mb-3">
                <img
                  src={category.image}
                  alt={category.name}
                  className="max-h-full object-contain"
                />
              </div>

              <p className="text-sm font-semibold text-gray-800 mb-3 text-center w-full break-words truncate">
                {category.name}
              </p>

              <div className="flex gap-2 w-full">
                <button
                onClick={() => {
                  setSelectedCategory(category);
                  setOpenEdit(true)}}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs py-1.5 rounded-lg">
                  Edit
                </button>

                <button 
                onClick={() => deleteCategory(category._id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs py-1.5 rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      }
      {loading && <Loading />}

      {openUploadCategory && (
        <UploadCategoryModel name={"Add Category"} close={() => setOpenUploadCategory(false)} />
      )}

      {
        openEdit && (
         <UploadCategoryModel  initialData = {selectedCategory} name={"Edit Category"} close={() => setOpenEdit(false)} />
        )
      }
    </section>
  );
};

export default CategoryPage;
