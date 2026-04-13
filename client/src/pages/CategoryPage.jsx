import React, { useState, useEffect } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/loading";
import api from "../api/axios";

const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const fetchCategory = async () => {
        try {
            setLoading(true);
            const response = await api.get("/category/get-category");
            if (response.data.success) {
                setCategoryData(response.data.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            setDeletingId(categoryId);

            await api.delete("/category/delete-category", {
                data: { categoryId },
            });

            fetchCategory();
        } catch (error) {
            console.log(error.response?.data);
        } finally {
            setDeletingId(null);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <section className="p-3 sm:p-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Category
                </h2>

                <button
                    onClick={() => setOpenUploadCategory(true)}
                    className="
                        bg-green-600 hover:bg-green-700
                        text-white
                        px-4 py-2
                        rounded-xl
                        text-sm sm:text-base
                        shadow
                        w-full sm:w-auto
                    "
                >
                    + Add Category
                </button>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex justify-center py-10">
                    <Loading />
                </div>
            )}

            {/* Empty State */}
            {!loading && categoryData.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-gray-500 text-sm">
                        No categories available
                    </p>
                </div>
            )}

            {/* Grid */}
            <div className="
                grid
                grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5
                gap-3 sm:gap-6
            ">
                {categoryData.map((category) => (
                    <div
                        key={category._id}
                        className="
                            bg-white
                            rounded-xl sm:rounded-2xl
                            shadow-md hover:shadow-lg
                            transition
                            p-3 sm:p-4
                            flex flex-col items-center text-center
                        "
                    >
                        {/* Image */}
                        <div className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center mb-2 sm:mb-3">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="max-h-full object-contain"
                            />
                        </div>

                        {/* Name */}
                        <p className="
                            text-xs sm:text-sm font-semibold text-gray-800
                            mb-3
                            w-full truncate
                        ">
                            {category.name}
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 w-full">

                            <button
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setOpenEdit(true);
                                }}
                                className="
                                    flex-1
                                    bg-green-500 hover:bg-green-600
                                    text-white
                                    text-xs sm:text-sm
                                    py-1.5
                                    rounded-lg
                                "
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => deleteCategory(category._id)}
                                disabled={deletingId === category._id}
                                className="
                                    flex-1
                                    bg-red-500 hover:bg-red-600
                                    text-white
                                    text-xs sm:text-sm
                                    py-1.5
                                    rounded-lg
                                    disabled:opacity-50
                                "
                            >
                                {deletingId === category._id
                                    ? "Deleting..."
                                    : "Delete"}
                            </button>

                        </div>
                    </div>
                ))}
            </div>

            {/* Modals */}
            {openUploadCategory && (
                <UploadCategoryModel
                    name={"Add Category"}
                    close={() => setOpenUploadCategory(false)}
                />
            )}

            {openEdit && (
                <UploadCategoryModel
                    initialData={selectedCategory}
                    name={"Edit Category"}
                    close={() => setOpenEdit(false)}
                />
            )}
        </section>
    );
};

export default CategoryPage;