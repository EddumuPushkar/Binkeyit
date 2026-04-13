import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Loading from "../components/loading.jsx";

const UploadProductPage = () => {
    const [data, setData] = useState({
        name: "",
        image: [],
        catagory: [],
        sub_catagory: [],
        unit: "",
        stock: "",
        price: "",
        dicount: "",
        discription: "",
        more_details: [""],
        publish: false,
    });

    const [categoryList, setCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cat = await api.get("/category/get-category");
                const sub = await api.post("/subcategory/get-subcategory");

                setCategoryList(cat.data.data);
                setSubCategoryList(sub.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImage = async (e) => {
        const files = Array.from(e.target.files);
        const token = localStorage.getItem("accessToken");

        if (!files.length) return;

        try {
            setLoading(true);

            const uploadedImages = await Promise.all(
                files.map(async (file) => {
                    const formData = new FormData();
                    formData.append("image", file);

                    const res = await api.post(
                        "/upload/upload-image",
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    return res.data.data;
                })
            );

            setData((prev) => ({
                ...prev,
                image: [...prev.image, ...uploadedImages],
            }));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await api.post("/product/add-product", data);

            alert("Product Added Successfully");

            setData({
                name: "",
                image: [],
                catagory: [],
                sub_catagory: [],
                unit: "",
                stock: "",
                price: "",
                dicount: "",
                discription: "",
                more_details: [],
                publish: false,
            });
        } catch (error) {
            console.log(error);
            alert("Error adding product");
        } finally {
            setLoading(false);
        }
    };

    const addField = () => {
        setData((prev) => ({
            ...prev,
            more_details: [...prev.more_details, ""],
        }));
    };

    const handleMoreDetailsChange = (index, value) => {
        const updated = [...data.more_details];
        updated[index] = value;

        setData((prev) => ({
            ...prev,
            more_details: updated,
        }));
    };

    return (
        <div className="p-4 sm:p-6 max-w-4xl mx-auto">
            {loading && <Loading />}

            <h2 className="text-xl sm:text-2xl font-bold mb-6">
                Upload Product
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-4 sm:p-6 rounded-xl shadow"
            >
                {/* NAME */}
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={data.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />

                {/* IMAGES */}
                <input
                    type="file"
                    multiple
                    onChange={handleImage}
                    className="w-full"
                />

                {/* IMAGE PREVIEW */}
                <div className="flex flex-wrap gap-2">
                    {data.image.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover border rounded"
                        />
                    ))}
                </div>

                {/* CATEGORY */}
                <select
                    multiple
                    onChange={(e) =>
                        setData((prev) => ({
                            ...prev,
                            catagory: Array.from(
                                e.target.selectedOptions,
                                (opt) => opt.value
                            ),
                        }))
                    }
                    className="w-full p-2 border rounded"
                >
                    {categoryList.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                {/* SUBCATEGORY */}
                <select
                    multiple
                    onChange={(e) =>
                        setData((prev) => ({
                            ...prev,
                            sub_catagory: Array.from(
                                e.target.selectedOptions,
                                (opt) => opt.value
                            ),
                        }))
                    }
                    className="w-full p-2 border rounded"
                >
                    {subCategoryList.map((sub) => (
                        <option key={sub._id} value={sub._id}>
                            {sub.name}
                        </option>
                    ))}
                </select>

                {/* GRID INPUTS (IMPORTANT UX UPGRADE) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                        type="text"
                        name="unit"
                        placeholder="Unit"
                        value={data.unit}
                        onChange={handleChange}
                        className="p-2 border rounded"
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={data.stock}
                        onChange={handleChange}
                        className="p-2 border rounded"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={data.price}
                        onChange={handleChange}
                        className="p-2 border rounded"
                    />

                    <input
                        type="number"
                        name="dicount"
                        placeholder="Discount %"
                        value={data.dicount}
                        onChange={handleChange}
                        className="p-2 border rounded"
                    />
                </div>

                {/* DESCRIPTION */}
                <textarea
                    name="discription"
                    placeholder="Description"
                    value={data.discription}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />

                {/* MORE DETAILS */}
                <div className="space-y-2">
                    {data.more_details.map((item, index) => (
                        <textarea
                            key={index}
                            placeholder="Extra details"
                            value={item}
                            onChange={(e) =>
                                handleMoreDetailsChange(index, e.target.value)
                            }
                            className="w-full p-2 border rounded"
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={addField}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                    Add Field
                </button>

                {/* PUBLISH */}
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="publish"
                        checked={data.publish}
                        onChange={handleChange}
                    />
                    Publish Product
                </label>

                {/* SUBMIT */}
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
                    Upload Product
                </button>
            </form>
        </div>
    );
};

export default UploadProductPage;