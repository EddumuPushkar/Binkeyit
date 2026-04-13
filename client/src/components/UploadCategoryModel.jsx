import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import api from "../api/axios.js";
import Loading from "./loading.jsx";

const UploadCategoryModel = ({ close, name, initialData }) => {

  const [data, setData] = useState({
    categoryId: "",
    name: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setData({
        categoryId: initialData._id,
        name: initialData.name,
        image: initialData.image,
      });
    }
  }, [initialData]);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.image) {
      alert("Name and Image required");
      return;
    }

    try {
      setLoading(true);

      if (name === "Add Category") {
        await api.post("/category/add-category", { data });
      } else {
        await api.put("/category/edit-category", data);
      }

      close();
      window.location.reload();
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategory = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await api.post("/upload/upload-image", formData);

      if (response.data.success) {
        setData((prev) => ({
          ...prev,
          image: response.data.data,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">

      {/* Modal */}
      <div className="
        bg-white w-full 
        max-w-sm sm:max-w-md md:max-w-lg
        max-h-[90vh] overflow-y-auto
        rounded-xl sm:rounded-2xl
        shadow-xl p-4 sm:p-6
        relative
      ">

        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
        >
          <ImCross size={14} />
        </button>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-5">
          {name}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Category Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Category Name
            </label>

            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleOnchange}
              placeholder="Enter category name"
              className="
                w-full mt-1
                border rounded-lg
                px-3 py-2
                text-sm sm:text-base
                focus:ring-2 focus:ring-green-500
                outline-none
              "
            />
          </div>

          {/* Image Section */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Category Image
            </label>

            <div className="flex flex-col sm:flex-row gap-3 mt-2 items-start sm:items-center">

              {/* Preview */}
              <div className="
                w-24 h-24 sm:w-28 sm:h-28
                border rounded-lg
                bg-gray-100
                flex items-center justify-center
                overflow-hidden
              ">
                {data.image ? (
                  <img
                    src={data.image}
                    className="w-full h-full object-cover"
                    alt="preview"
                  />
                ) : (
                  <span className="text-xs text-gray-400">
                    No Image
                  </span>
                )}
              </div>

              {/* Upload */}
              <label className="w-full sm:w-auto cursor-pointer">
                <div className="
                  w-full sm:w-auto text-center
                  px-4 py-2
                  rounded-lg
                  text-sm
                  bg-green-600 hover:bg-green-700
                  text-white
                  transition
                ">
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

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full
              bg-green-600 hover:bg-green-700
              text-white
              py-2.5
              rounded-lg
              text-sm sm:text-base
              font-medium
              transition
            "
          >
            {loading ? <Loading /> : "Save Category"}
          </button>

        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;