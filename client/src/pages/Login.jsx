import React, { useState } from "react";
import Binkeyit from "../assets/Binkeyit.png";
import useLoginStore from "../zustand/loginStore";
import { useNavigate } from "react-router-dom";

function Login({ handleOtp }) {
  const { email, setEmail } = useLoginStore();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" />

      {/* Modal wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
        {/* Card */}
        <div className="
          w-full
          max-w-[420px]
          bg-white
          rounded-2xl
          p-6
          sm:p-8
          relative
        ">
          {/* Back Arrow */}
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 top-4 sm:left-6 sm:top-6 text-xl"
          >
            ←
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-5 sm:mb-6">
            <div className="bg-yellow-400 p-3 sm:p-4 rounded-2xl">
              <img
                src={Binkeyit}
                alt="Blinkit"
                className="w-12 sm:w-14"
              />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-900">
            India&apos;s last minute app
          </h1>
          <p className="text-center text-gray-600 mt-1 text-sm sm:text-base">
            Log in or Sign up
          </p>

          {/* Email Input */}
          <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 mt-6 sm:mt-8">
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail({ email: e.target.value })}
              className="w-full outline-none text-gray-700 text-sm sm:text-base"
            />
          </div>

          {/* Continue Button */}
          <button
            onClick={handleOtp}
            disabled={!isValidEmail}
            className={`w-full mt-5 sm:mt-6 py-3 rounded-2xl font-semibold text-white transition
              ${
                isValidEmail
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Continue
          </button>

          {/* Footer */}
          <p className="text-xs text-center text-gray-500 mt-5 sm:mt-6 leading-relaxed">
            By continuing, you agree to our{" "}
            <span className="underline cursor-pointer">Terms of service</span>{" "}
            &{" "}
            <span className="underline cursor-pointer">Privacy policy</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
