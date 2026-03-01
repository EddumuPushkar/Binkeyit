import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import Loading from "./loading.jsx";
const UploadCategoryModel = ({ close }) => {
  let isAdmin = "";
  const Navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.image) {
      alert("Name and Image required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/category/add-category", { data });
      
      close();
      window.location.reload();
    } catch (error) {
      console.log("BackendError:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategory = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const token = localStorage.getItem("accessToken");

    try {
      console.log("Tokenasdddsddddadsdad:", token);
      const response = await api.post("/upload/upload-image", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const uploadedUrl = response.data.data;

        setData((prev) => ({
          ...prev,
          image: uploadedUrl,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
        >
          <ImCross size={16} />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter category name"
              value={data.name}
              onChange={handleOnchange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Image
            </label>

            <div className="flex items-center gap-4">
              {/* Preview */}
              <div className="w-28 h-28 border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
              </div>

              {/* Upload Button */}
              <label className="cursor-pointer">
                <div
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition
                  ${
                    data.name
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Upload Image
                </div>

                <input
                  type="file"
                  onChange={handleUploadCategory}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition shadow-md hover:shadow-lg"
          >
            {loading ? <Loading /> : "Save Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
