import React, { useEffect, useState } from "react";
import AddAddress from "../components/AddAddress.jsx";
import api from "../api/axios.js";
import { IoLocationOutline } from "react-icons/io5";

function Address() {
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const res = await api.get("/address/get-address");
                setAddresses(res.data.address);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, []);

    return (
        <div className="p-3 sm:p-6 max-w-2xl mx-auto">

            {/* Title */}
            <h1 className="font-bold text-xl sm:text-2xl mb-3">
                My Addresses
            </h1>

            {/* Add Button */}
            <button
                onClick={() => setShowForm(true)}
                className="
                    text-sm sm:text-base
                    text-green-700 border border-green-700
                    px-3 py-1.5 rounded-lg
                    hover:bg-green-700 hover:text-white
                    transition mb-4
                "
            >
                + Add Address
            </button>

            {/* Modal */}
            {showForm && (
                <AddAddress onClose={() => setShowForm(false)} />
            )}

            {/* Loading */}
            {loading && (
                <p className="text-sm text-gray-500">Loading...</p>
            )}

            {/* Empty State */}
            {!loading && addresses.length === 0 && (
                <p className="text-sm text-gray-500">
                    No addresses found.
                </p>
            )}

            {/* List */}
            <div className="space-y-3 sm:space-y-4">

                {addresses.map((addr, index) => (
                    <div
                        key={index}
                        className="
                            border rounded-xl
                            p-3 sm:p-4
                            shadow-sm hover:shadow-md
                            transition
                        "
                    >
                        {/* Address Info */}
                        <div className="flex gap-2">

                            <IoLocationOutline className="text-green-600 mt-1 shrink-0" />

                            <div className="flex-1">

                                <p className="text-sm sm:text-base text-gray-800 font-medium">
                                    {addr.full_name}
                                </p>

                                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                                    {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                                </p>

                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="
                            mt-3
                            flex flex-col sm:flex-row
                            gap-2
                        ">
                            <button className="
                                bg-blue-500 hover:bg-blue-600
                                text-white
                                px-3 py-1.5
                                rounded-lg
                                text-sm
                                w-full sm:w-auto
                            ">
                                Edit
                            </button>

                            <button className="
                                bg-red-500 hover:bg-red-600
                                text-white
                                px-3 py-1.5
                                rounded-lg
                                text-sm
                                w-full sm:w-auto
                            ">
                                Delete
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Address;