import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import useCartStore from "../zustand/useCartStore";

function ProductListPage() {
    const { categorySlug, subCategorySlug } = useParams();
    const navigate = useNavigate();

    const categoryId = categorySlug?.split("-").pop();
    const subCategoryIdFromURL = subCategorySlug?.split("-").pop();

    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeSubCategory, setActiveSubCategory] = useState(null);
    const [loading, setLoading] = useState(false);

    const addToCart = useCartStore((state) => state.addToCart);

    // FETCH SUBCATEGORIES
    const fetchSubCategories = async () => {
        try {
            setLoading(true);

            const res = await api.get(`/subcategory/${categoryId}`);
            const data = res.data.data || [];

            setSubCategories(data);

            if (subCategoryIdFromURL) {
                setActiveSubCategory(subCategoryIdFromURL);
            } else if (data.length > 0) {
                setActiveSubCategory(data[0]._id);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // FETCH PRODUCTS
    const fetchProducts = async () => {
        try {
            const res = await api.get(`/product/${activeSubCategory}`);
            setProducts(res.data.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (categoryId) fetchSubCategories();
    }, [categoryId]);

    useEffect(() => {
        if (activeSubCategory) fetchProducts();
    }, [activeSubCategory]);

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* MOBILE SUBCATEGORY SCROLL */}
            <div className="
                md:hidden
                flex gap-2 overflow-x-auto
                bg-white p-2 border-b
                sticky top-0 z-10
            ">
                {subCategories.map((sub) => (
                    <button
                        key={sub._id}
                        onClick={() => setActiveSubCategory(sub._id)}
                        className={`
                            whitespace-nowrap px-3 py-1 rounded-full text-sm
                            ${activeSubCategory === sub._id
                                ? "bg-green-600 text-white"
                                : "bg-gray-100"
                            }
                        `}
                    >
                        {sub.name}
                    </button>
                ))}
            </div>

            <div className="flex">

                {/* DESKTOP SIDEBAR */}
                <div className="hidden md:block w-1/5 bg-white border-r h-screen overflow-y-auto">
                    {subCategories.map((sub) => (
                        <div
                            key={sub._id}
                            onClick={() => setActiveSubCategory(sub._id)}
                            className={`p-3 text-sm cursor-pointer border-b
                                ${activeSubCategory === sub._id
                                    ? "bg-green-100 font-medium"
                                    : "hover:bg-gray-100"
                                }`}
                        >
                            {sub.name}
                        </div>
                    ))}
                </div>

                {/* PRODUCTS */}
                <div className="w-full md:w-4/5 p-3 md:p-4">

                    {/* LOADING */}
                    {loading ? (
                        <div className="text-center text-gray-500 py-10">
                            Loading products...
                        </div>
                    ) : (
                        <div className="
                            grid
                            grid-cols-2 sm:grid-cols-3 lg:grid-cols-5
                            gap-3
                        ">
                            {products.map((item) => (
                                <div
                                    key={item._id}
                                    onClick={() => navigate(`/product/${item._id}`)}
                                    className="bg-white border rounded-lg p-2 hover:shadow-sm"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-28 sm:h-32 object-contain rounded"
                                    />

                                    <h2 className="text-xs sm:text-sm mt-2 line-clamp-2">
                                        {item.name}
                                    </h2>

                                    <p className="text-sm font-semibold mt-1">
                                        ₹{item.price}
                                    </p>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(item);
                                        }}
                                        className="
                                            mt-2 w-full
                                            border border-green-500
                                            text-green-600
                                            text-sm py-1
                                            rounded
                                        "
                                    >
                                        Add
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default ProductListPage;