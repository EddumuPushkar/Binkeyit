import { useState, useRef } from "react";
import api from "../api/axios.js";
import useLoginStore from "../zustand/loginStore.js";


const VerifyOtp = ({ handleVerifyOtp }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const [resendDisabled, setResendDisabled] = useState(false);
  const {email} = useLoginStore();

  const isValidOtp = (otp) => /^\d{4}$/.test(otp);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const finalOtp = otp.join("");
    if (!isValidOtp(finalOtp)) return;
    handleVerifyOtp(finalOtp);
  };

  const startResendTimer = () => {
    setResendDisabled(true);

    setTimeout(
      () => {
        setResendDisabled(false);
      },
      5 * 60 * 1000,
    ); // 5 minutes
  };

  const handleResendOtp = async () => {
    try {
      await api.post("/user/resend-otp", { email });
      alert("OTP sent again");
      startResendTimer();
    } catch (err) {
      alert("Failed to resend OTP");
    }
  };

  const isOtpComplete = otp.join("").length === 4;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[360px] rounded-2xl px-6 py-7 shadow-xl">
        {/* Heading */}
        <h2 className="text-[22px] font-semibold text-gray-900">Enter OTP</h2>
        <p className="text-sm text-gray-500 mt-1">
          We’ve sent a 4-digit code to your email
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-between mt-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength="1"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="
                w-14 h-14 text-center text-xl font-semibold
                border border-gray-300 rounded-xl
                focus:outline-none focus:border-green-600
              "
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          disabled={!isOtpComplete}
          onClick={handleSubmit}
          className={`w-full mt-8 py-3 rounded-xl text-base font-semibold
            ${
              isOtpComplete
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Verify & Continue
        </button>

        {/* Resend (optional) */}
        <button
          onClick={handleResendOtp}
          disabled={resendDisabled}
          className={`font-medium ${
            resendDisabled
              ? "text-gray-400 cursor-not-allowed"
              : "text-green-600"
          }`}
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
