import React from "react";
import useCartStore from "../zustand/useCartStore";
import { useNavigate } from "react-router-dom";

function Cart({ setShowCart }) {
    const items = useCartStore((state) => state.items);
    const increaseQty = useCartStore((state) => state.increaseQty);
    const decreaseQty = useCartStore((state) => state.decreaseQty);
    // const removeItem = useCartStore((state) => state.removeFromCart);
    const navigate = useNavigate();

    //  Total calculation
    const total = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="fixed inset-0 z-50">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setShowCart(false)}
            />

            {/* Drawer */}
            <div className="absolute right-0 top-0 h-full w-[350px] bg-white shadow-lg p-5 flex flex-col">
                
                <h2 className="text-xl font-semibold mb-4">My Cart</h2>

                <button
                    onClick={() => setShowCart(false)}
                    className="absolute top-4 right-4"
                >
                    ✕
                </button>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto">
                    {items.length === 0 ? (
                        <p className="text-gray-500 text-center mt-10">
                            Cart is empty
                        </p>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center justify-between mb-4 border-b pb-2"
                            >
                                <div>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                </div>

                                <div className="flex-1 ml-3">
                                    <p className="font-medium">{item.name}</p>

                                    {/* Quantity controls */}
                                    <div className="flex items-center gap-2 mt-1">
                                        <button
                                            onClick={() => decreaseQty(item._id)}
                                            className="px-2 bg-gray-200 rounded"
                                        >
                                            -
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            onClick={() => increaseQty(item._id)}
                                            className="px-2 bg-gray-200 rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-medium">
                                        ₹{item.price * item.quantity}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Bill Section */}
                {items.length > 0 && (
                    <div className="border-t pt-4">
                        Bill Details

                        <p className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{total}</span>
                        </p>

                        <p className="flex justify-between">
                            <span>Delivery</span>
                            <span>₹40</span>
                        </p>

                        <p className="flex justify-between font-semibold text-lg mt-2">
                            <span>Total</span>
                            <span>₹{total + 40}</span>
                        </p>

                        <button 
                        onClick={() => {
                            navigate("/checkout", { state: { total } });
                            setShowCart(false);
                        }}
                        className="w-full mt-4 bg-green-600 text-white py-2 rounded">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;