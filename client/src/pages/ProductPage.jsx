import { useEffect, useState } from "react";
import api from "../api/axios.js";

const ProductPage = () => {
    const [productData, setProductData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchProductData = async () => {
        try {
            setLoading(true);

            const res = await api.post("/product/get-product", {
                page,
            });

            const { data } = res;

            if (data.success) {
                setProductData(data.data || []);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [page]);

    return (
        <div className="p-3 sm:p-6 bg-gray-100 min-h-screen">

            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                Product Page
            </h1>

            {/* LOADING */}
            {loading && (
                <p className="text-center text-gray-500">
                    Loading...
                </p>
            )}

            {/* EMPTY STATE */}
            {!loading && productData.length === 0 && (
                <p className="text-center text-gray-500">
                    No products found
                </p>
            )}

            {/* GRID */}
            <div className="
                grid
                grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
                gap-3 sm:gap-5
            ">
                {productData.map((item) => (
                    <div
                        key={item._id}
                        className="
                            bg-white border rounded-xl
                            shadow-sm hover:shadow-lg
                            transition p-2 sm:p-3
                        "
                    >
                        {/* IMAGE */}
                        <img
                            src={
                                Array.isArray(item.image)
                                    ? item.image[0]
                                    : item.image || "https://via.placeholder.com/150"
                            }
                            alt={item.name}
                            className="
                                w-full h-24 sm:h-32
                                object-contain
                                rounded-lg mb-2
                            "
                        />

                        {/* NAME */}
                        <h2 className="text-xs sm:text-sm font-semibold line-clamp-1">
                            {item.name}
                        </h2>

                        {/* UNIT */}
                        <p className="text-gray-500 text-[10px] sm:text-xs mt-1">
                            Unit: {item.unit}
                        </p>

                        {/* PRICE (optional but useful UX) */}
                        <p className="text-green-600 font-semibold text-sm mt-1">
                            ₹{item.price}
                        </p>
                    </div>
                ))}
            </div>

            {/* PAGINATION */}
            <div className="flex flex-wrap justify-center items-center gap-3 mt-6 sm:mt-8">

                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className="px-3 sm:px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                >
                    Previous
                </button>

                <span className="font-medium text-sm">
                    Page {page}
                </span>

                <button
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                >
                    Next
                </button>

            </div>

        </div>
    );
};

export default ProductPage;