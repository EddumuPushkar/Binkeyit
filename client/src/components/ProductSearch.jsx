import React from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../zustand/useCartStore";
import useSearchStore from "../zustand/useSearchStore";

function ProductSearch({ item }) {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div
      onClick={() => navigate(`/product/${item._id}`)}
      className="
        w-[calc(100%/2-4px)]
        sm:w-[calc(100%/3-6px)]
        md:w-[calc(100%/4-6px)]
        lg:w-[calc(100%/7-8px)]
        bg-white border rounded-lg p-2
        hover:shadow-md transition cursor-pointer
        flex flex-col justify-between
      "
    >
      {/* IMAGE */}
      <div className="flex justify-center items-center h-24">
        <img
          src={item.image}
          alt={item.name}
          className="h-full object-contain"
        />
      </div>

      {/* NAME */}
      <h2 className="text-xs mt-2 line-clamp-2 text-gray-800">
        {item.name}
      </h2>

      {/* PRICE + BUTTON */}
      <div className="mt-2 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-900">
          ₹{item.price}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(item);
          }}
          className="
            border border-green-500 text-green-600
            text-xs px-2 py-1 rounded hover:bg-green-50
          "
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default ProductSearch;
