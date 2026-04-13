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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubCategoryData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await api.post("/upload/upload-image", formData);

            if (response.data.success) {
                setSubCategoryData((prev) => ({
                    ...prev,
                    image: response.data.data,
                }));
            }
        } catch (error) {
            console.log(error);
        }
    };

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
            } else {
                await api.put("/subcategory/edit-subcategory", subCategoryData);
            }

            close();
            window.location.reload();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const selectedCategoryName =
        categoryData.find((c) => c._id === subCategoryData.category)?.name ||
        "Select Category";

    return (
        <section className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">

            {/* Modal */}
            <div className="
                bg-white w-full
                max-w-sm sm:max-w-md md:max-w-lg
                max-h-[90vh] overflow-y-auto
                rounded-xl sm:rounded-2xl
                shadow-2xl
                p-4 sm:p-6
                relative
            ">

                {/* Close */}
                <button
                    onClick={close}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                >
                    <ImCross size={14} />
                </button>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-semibold text-center mb-4">
                    {name}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        value={subCategoryData.name}
                        onChange={handleChange}
                        placeholder="Enter sub category name"
                        className="
                            w-full
                            border rounded-lg
                            px-3 py-2
                            text-sm sm:text-base
                            focus:ring-2 focus:ring-green-500
                            outline-none
                        "
                    />

                    {/* IMAGE */}
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

                        <div className="
                            w-24 h-24 sm:w-28 sm:h-28
                            border rounded-lg
                            bg-gray-100
                            flex items-center justify-center
                            overflow-hidden
                        ">
                            {subCategoryData.image ? (
                                <img
                                    src={subCategoryData.image}
                                    className="w-full h-full object-cover"
                                    alt="preview"
                                />
                            ) : (
                                <span className="text-xs text-gray-400">
                                    No Image
                                </span>
                            )}
                        </div>

                        <label className="w-full sm:w-auto cursor-pointer">
                            <div className="
                                w-full sm:w-auto text-center
                                bg-green-100 text-green-700
                                px-4 py-2 rounded-lg
                                hover:bg-green-200
                                text-sm
                            ">
                                Upload
                            </div>

                            <input
                                type="file"
                                onChange={handleUploadImage}
                                className="hidden"
                            />
                        </label>

                    </div>

                    {/* CATEGORY DROPDOWN */}
                    <div className="relative">

                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            className="
                                w-full flex items-center justify-between
                                border rounded-md
                                px-3 py-2
                                text-sm
                                bg-white
                            "
                        >
                            <span>{selectedCategoryName}</span>
                            <MdKeyboardArrowDown />
                        </button>

                        {open && (
                            <div className="
                                absolute z-50 mt-1 w-full
                                bg-white border rounded-md shadow
                                max-h-40 overflow-y-auto
                            ">
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
                                        className="
                                            px-3 py-2 text-sm
                                            hover:bg-green-100
                                            cursor-pointer
                                        "
                                    >
                                        {cat.name}
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            bg-green-600 hover:bg-green-700
                            text-white
                            py-2.5
                            rounded-lg
                            text-sm sm:text-base
                            transition
                        "
                    >
                        {loading ? <Loading /> : name === "Edit Sub-Category"
                            ? "Update Sub Category"
                            : "Add Sub Category"}
                    </button>

                </form>
            </div>
        </section>
    );
}

export default UploadSubCategoryModel;