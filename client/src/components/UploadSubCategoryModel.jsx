import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import api from "../api/axios";
import { MdKeyboardArrowDown } from "react-icons/md";
import Loading from "./loading";

function UploadSubCategoryModel({ close, name, initialData }) {
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [subCategoryData, setSubCategoryData] = useState({
        name: "",
        category: "",
        image: "",
    });

    // ✅ PREFILL (NO extra field)
    useEffect(() => {
        if (initialData) {
            setSubCategoryData({
                subCategoryId: initialData._id,
                name: initialData.name,
                category: initialData.category?._id || "",
                image: initialData.image,
            });
        }
    }, [initialData]);

    // input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubCategoryData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // upload image
    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);
        const token = localStorage.getItem("accessToken");

        try {
            const response = await api.post("/upload/upload-image", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setSubCategoryData((prev) => ({
                    ...prev,
                    image: response.data.data,
                }));
            }
        } catch (error) {
            console.log("Upload error:", error);
        }
    };

    // fetch categories
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                setLoading(true);
                const res = await api.get("/category/get-category");

                if (res.data.success) {
                    setCategoryData(res.data.data);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, []);

    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !subCategoryData.name ||
            !subCategoryData.category ||
            !subCategoryData.image
        ) {
            alert("All fields are required");
            return;
        }

        try {
            setLoading(true);

            if (name === "Add Sub-Category") {
                await api.post("/subcategory/add-subcategory", subCategoryData);
            } else if (name === "Edit Sub-Category") {
                await api.put("/subcategory/edit-subcategory", {
                    subCategoryId: subCategoryData.subCategoryId,
                    categoryId: subCategoryData.category, 
                    name: subCategoryData.name,
                    image: subCategoryData.image,
                });
            }

            close();
            window.location.reload();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    //  derive category name (NO state pollution)
    const selectedCategoryName =
        categoryData.find((cat) => cat._id === subCategoryData.category)
            ?.name || "Select Category";

    return (
        <section className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
                <button
                    onClick={close}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                >
                    <ImCross size={16} />
                </button>

                <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">
                    {name}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        name="name"
                        value={subCategoryData.name}
                        onChange={handleChange}
                        placeholder="Enter sub category name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                    />

                    {/* IMAGE */}
                    <div className="flex items-center gap-4">
                        <div className="w-24 h-24 border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                            {subCategoryData.image ? (
                                <img
                                    src={subCategoryData.image}
                                    alt="preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-xs text-gray-400">
                                    No Image
                                </span>
                            )}
                        </div>

                        <label className="cursor-pointer bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200">
                            Upload
                            <input
                                type="file"
                                onChange={handleUploadImage}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* CATEGORY SELECT */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            className="flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                        >
                            <span>{selectedCategoryName}</span>
                            <MdKeyboardArrowDown />
                        </button>

                        {open && (
                            <div className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow max-h-40 overflow-y-auto">
                                {categoryData.map((cat) => (
                                    <div
                                        key={cat._id}
                                        onClick={() => {
                                            setSubCategoryData((prev) => ({
                                                ...prev,
                                                category: cat._id,
                                            }));
                                            setOpen(false);
                                        }}
                                        className="px-3 py-2 text-sm hover:bg-green-100 cursor-pointer"
                                    >
                                        {cat.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                    >
                        {loading ? (
                            <Loading />
                        ) : name === "Edit Sub-Category" ? (
                            "Update Sub Category"
                        ) : (
                            "Add Sub Category"
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}
export default UploadSubCategoryModel;
