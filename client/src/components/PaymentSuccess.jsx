import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="h-screen w-full flex items-center justify-center bg-white px-4">
            
            <div className="flex flex-col items-center text-center max-w-md">

                {/* Success Icon */}
                <div className="text-green-500 text-5xl sm:text-6xl mb-4">
                    ✔
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-green-600">
                    Payment Successful
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                    Redirecting to home...
                </p>

                {/* Optional loading dots feel */}
                <div className="mt-4 flex gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></span>
                </div>

            </div>
        </div>
    );
}

export default PaymentSuccess;