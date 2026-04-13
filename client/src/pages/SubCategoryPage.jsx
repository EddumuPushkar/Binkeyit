import React, { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel.jsx";
import api from "../api/axios.js";

const SubCategoryPage = () => {
    const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    const fetchSubCategories = async () => {
        try {
            setLoading(true);
            const response = await api.post("/subcategory/get-subcategory");

            if (response.data.success) {
                setData(response.data.data);
            }
        } catch (error) {
            console.log("Error fetching subcategories:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteSubCategory = async (id) => {
        try {
            setLoading(true);

            if (!id) {
                alert("SubCategory ID required");
                return;
            }

            await api.delete("/subcategory/delete-subcategory", {
                data: { id },
            });

            fetchSubCategories();
        } catch (error) {
            console.log("Delete Error:", error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubCategories();
    }, []);

    return (
        <section className="p-3 sm:p-4 md:p-6">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Sub-Category
                </h2>

                <button
                    onClick={() => setOpenAddSubCategory(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-5 py-2 rounded-xl shadow-md transition w-full sm:w-auto"
                >
                    Add Sub-Category
                </button>
            </div>

            {/* MODALS */}
            {openAddSubCategory && (
                <UploadSubCategoryModel
                    name={"Add Sub-Category"}
                    close={() => {
                        setOpenAddSubCategory(false);
                        fetchSubCategories();
                    }}
                />
            )}

            {openEdit && (
                <UploadSubCategoryModel
                    name={"Edit Sub-Category"}
                    initialData={selectedSubCategory}
                    close={() => {
                        setOpenEdit(false);
                        fetchSubCategories();
                    }}
                />
            )}

            {/* LOADING */}
            {loading ? (
                <div className="text-center py-10 text-gray-500">
                    Loading Sub Categories...
                </div>
            ) : (
                // TABLE WRAPPER (IMPORTANT FIX)
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[700px]">
                        <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
                            
                            {/* HEADER */}
                            <thead className="bg-gray-100 sticky top-0 z-10 text-sm">
                                <tr>
                                    <th className="px-4 py-2 text-left">#</th>
                                    <th className="px-4 py-2 text-left">Image</th>
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left">Category</th>
                                    <th className="px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>

                            {/* BODY */}
                            <tbody>
                                {data.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr
                                            key={item._id}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-2 text-sm">
                                                {index + 1}
                                            </td>

                                            <td className="px-4 py-2">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                                                />
                                            </td>

                                            <td className="px-4 py-2 font-medium max-w-[150px]">
                                                <p className="truncate">
                                                    {item.name}
                                                </p>
                                            </td>

                                            <td className="px-4 py-2 text-gray-600 max-w-[150px]">
                                                <p className="truncate">
                                                    {item.category?.name || "No Category"}
                                                </p>
                                            </td>

                                            <td className="px-4 py-2">
                                                <div className="flex flex-col sm:flex-row gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedSubCategory(item);
                                                            setOpenEdit(true);
                                                        }}
                                                        className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-md"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            deleteSubCategory(item._id)
                                                        }
                                                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="text-center py-10 text-gray-500"
                                        >
                                            No Sub-Categories Found 😕
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </section>
    );
};

export default SubCategoryPage;