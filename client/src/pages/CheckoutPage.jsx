import React, { useEffect, useState } from "react";
import useCartStore from "../zustand/useCartStore.js";
import { useLocation } from "react-router-dom";
import AddAddress from "../components/AddAddress.jsx";
import api from "../api/axios.js";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
    const { items } = useCartStore();
    const location = useLocation();
    const total = location.state?.total || 0;

    const [paymentMethod, setPaymentMethod] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();
    const clearCart = useCartStore((state) => state.clearCart);

    //  multiple addresses
    const [addresses, setAddresses] = useState([]);

    //  form state
    const [formData, setFormData] = useState({
        full_name: "",
        address: "",
        state: "",
        city: "",
        pincode: "",
    });

    //  control form / view
    const [showForm, setShowForm] = useState(true);

    //  Fetch address from backend
    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const res = await api.get("/address/get-address");

                if (res.data.address) {
                    // handle both array & single object
                    const addr = Array.isArray(res.data.address)
                        ? res.data.address
                        : [res.data.address];

                    setAddresses(addr);
                    setShowForm(false);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchAddress();
    }, []);

    //  Prefill form from last address
    useEffect(() => {
        if (addresses.length > 0) {
            const last = addresses[addresses.length - 1];

            setFormData({
                full_name: last.full_name || "",
                address: last.address || "",
                state: last.state || "",
                city: last.city || "",
                pincode: last.pincode || "",
            });
        }
    }, [addresses]);
    //  handle input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    //  save address
    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.full_name ||
            !formData.address ||
            !formData.city ||
            !formData.state ||
            !formData.pincode
        ) {
            alert("Please fill all fields");
            return;
        }

        setAddresses((prev) => [...prev, formData]);
        setShowForm(false);

        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    };

    //  payment
    const handlePayment = async() => {
        if (!paymentMethod) {
            alert("Please select payment method");
            return;
        }

        if (addresses.length === 0) {
            alert("Please add address first");
            return;
        }

        // show success overlay
        setShowSuccess(true);
        createOrder();
        clearCart();

        // redirect after 3 sec
        setTimeout(() => {
            navigate("/");
        }, 3000);
    };
    const createOrder = async () => {
        try{
            const res = await api.post("/orders/create-order",{
                items,
                totalPrice: total,
                shippingAddress: formData,
            })
        }catch(error){
            console.log(error);
        }
    }

    const lastAddress = addresses[addresses.length - 1];

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 px-4">
                {/* LEFT - ADDRESS */}
                <div className="bg-white rounded-2xl shadow-md p-5">
                    <h3 className="text-lg font-semibold mb-4">
                        Delivery Address
                    </h3>

                    <div className="flex items-start gap-3">
                        <IoLocationOutline className="text-green-600 text-xl mt-1" />

                        <div className="flex-1">
                            <p className="font-semibold text-gray-800">
                                {formData.full_name}
                            </p>

                            <p className="text-sm text-gray-600">
                                {formData.address}, {formData.city},{" "}
                                {formData.state} - {formData.pincode}
                            </p>

                            <button
                                type="button"
                                onClick={() => navigate("/dashboard/address")}
                                className="text-green-600 text-sm mt-2 font-medium hover:underline"
                            >
                                Change
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT - SUMMARY */}
                <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between">
                    {/* ORDER ITEMS */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Order Summary
                        </h3>

                        <div className="max-h-52 overflow-y-auto space-y-3">
                            {items.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex justify-between text-sm border-b pb-2"
                                >
                                    <span>
                                        {item.name} × {item.quantity}
                                    </span>
                                    <span>₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between mt-4 text-lg font-bold">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                    </div>

                    {/* PAYMENT */}
                    <div className="mt-5 border rounded-xl p-4">
                        <h3 className="font-medium mb-3">Payment Method</h3>

                        <label className="flex items-center justify-between border p-3 rounded-lg mb-2 cursor-pointer hover:border-green-500">
                            <span>UPI</span>
                            <input
                                type="radio"
                                name="payment"
                                onChange={() => setPaymentMethod("UPI")}
                            />
                        </label>

                        <label className="flex items-center justify-between border p-3 rounded-lg cursor-pointer hover:border-green-500">
                            <span>Cash on Delivery</span>
                            <input
                                type="radio"
                                name="payment"
                                onChange={() => setPaymentMethod("COD")}
                            />
                        </label>
                    </div>

                    {/* PAY BUTTON */}
                    <button
                        onClick={handlePayment}
                        className="mt-6 w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-lg shadow-md"
                    >
                        Pay ₹{total}
                    </button>
                </div>
            </div>

            {/* SUCCESS MESSAGE */}
            {showMessage && (
                <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                    Successfully Added
                </div>
            )}
            {showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center w-80 animate-fadeIn">
                        
                        <div className="w-16 h-16 bg-green-500 text-white flex items-center justify-center rounded-full text-3xl mx-auto mb-4">
                            ✓
                        </div>

                        <h2 className="text-xl font-semibold text-green-600">
                            Payment Successful
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Redirecting to home...
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CheckoutPage;
