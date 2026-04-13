import React, { useEffect, useRef, useState } from "react";
import useCartStore from "../zustand/useCartStore";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Loading from "../components/loading.jsx";

function ProductDetails() {
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const imageContainer = useRef();

    const { id } = useParams();
    const { items, addToCart, increaseQty, decreaseQty } = useCartStore();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const res = await api.get(`/product/single/${id}`);
                const data = res.data.data;

                const imagesArray =
                    Array.isArray(data.images)
                        ? data.images
                        : data.image
                            ? [data.image]
                            : [];

                const safeImages = imagesArray.filter(Boolean);

                setProduct({
                    ...data,
                    images: safeImages,
                });

                setSelectedImage(safeImages[0] || "");
            } catch (err) {
                console.log(err);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (!product) return <Loading />;

    const item = items.find((i) => i._id === product?._id);

    return (
        <div className="max-w-6xl mx-auto p-3 sm:p-6 pb-24 md:pb-6">

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">

                {/* LEFT */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">

                    {/* MAIN IMAGE */}
                    <div className="flex justify-center">
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt={product.name}
                                className="w-full max-h-[300px] sm:max-h-[400px] object-contain"
                            />
                        ) : (
                            <div className="text-gray-400">
                                No Image Available
                            </div>
                        )}
                    </div>

                    {/* THUMBNAILS */}
                    {product.images.length > 0 && (
                        <div className="flex justify-center mt-4">
                            <div className="flex gap-3 overflow-x-auto px-2">
                                {product.images.map((img, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedImage(img)}
                                        className={`
                                            w-16 h-16 sm:w-20 sm:h-20
                                            min-w-[64px]
                                            rounded-lg border cursor-pointer
                                            flex items-center justify-center
                                            ${selectedImage === img
                                                ? "border-green-600"
                                                : "border-gray-200"}
                                        `}
                                    >
                                        <img
                                            src={img}
                                            alt="thumb"
                                            className="w-full h-full object-contain p-1"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT */}
                <div className="flex flex-col justify-between">

                    <div>

                        <p className="bg-green-100 text-green-700 px-2 py-1 w-fit rounded-full text-xs sm:text-sm">
                            10 Min
                        </p>

                        <h1 className="text-lg sm:text-2xl font-semibold mt-2">
                            {product.name}
                        </h1>

                        <p className="text-sm text-gray-500">
                            {product.brand}
                        </p>

                        {/* PRICE */}
                        <div className="mt-4 flex flex-wrap items-center gap-2">

                            <span className="text-xl sm:text-2xl font-bold text-green-600">
                                ₹{product.price}
                            </span>

                            {product.originalPrice && (
                                <>
                                    <span className="line-through text-gray-400">
                                        ₹{product.originalPrice}
                                    </span>

                                    <span className="text-green-600 text-sm font-semibold">
                                        {Math.round(
                                            ((product.originalPrice - product.price) /
                                                product.originalPrice) * 100
                                        )}% OFF
                                    </span>
                                </>
                            )}

                        </div>

                        <p className="text-sm text-gray-600 mt-2">
                            Delivery in {product.deliveryTime || "10 mins"}
                        </p>

                    </div>

                    {/* CART BUTTON */}
                    <div className="mt-4">

                        {!item ? (
                            <button
                                onClick={() => addToCart(product)}
                                className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-lg w-full md:w-auto"
                            >
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center gap-3 bg-green-600 text-white px-4 py-2 rounded-lg w-fit">
                                <button onClick={() => decreaseQty(product._id)}>
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button onClick={() => increaseQty(product._id)}>
                                    +
                                </button>
                            </div>
                        )}

                    </div>

                </div>

            </div>

            {/* DESCRIPTION */}
            <div className="mt-6 bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
                <h2 className="text-lg font-semibold mb-2">
                    Product Details
                </h2>

                <p className="text-sm text-gray-600">
                    {product.description || "No description available."}
                </p>
            </div>

            {/* MOBILE FIXED BAR */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t p-3 flex justify-between items-center md:hidden">
                <span className="font-semibold text-green-600">
                    ₹{product.price}
                </span>

                {!item ? (
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-green-600 text-white px-5 py-2 rounded-lg"
                    >
                        Add
                    </button>
                ) : (
                    <div className="flex items-center gap-3 bg-green-600 text-white px-4 py-2 rounded-lg">
                        <button onClick={() => decreaseQty(product._id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQty(product._id)}>+</button>
                    </div>
                )}
            </div>

        </div>
    );
}

export default ProductDetails;