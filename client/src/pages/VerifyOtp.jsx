import { useState, useRef, useEffect } from "react";
import api from "../api/axios.js";
import useLoginStore from "../zustand/loginStore.js";

const VerifyOtp = ({ handleVerifyOtp }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const inputsRef = useRef([]);
  const { email } = useLoginStore();

  const isOtpValid = otp.join("").length === 4;

  // 🔁 Auto timer countdown
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (e.key === "Enter" && isOtpValid) {
      handleVerifyOtp(otp.join(""));
    }
  };

  const handleSubmit = () => {
    if (!isOtpValid) return;
    handleVerifyOtp(otp.join(""));
  };

  const handleResendOtp = async () => {
    if (resendDisabled) return;

    try {
      await api.post("/user/resend-otp", { email });

      setResendDisabled(true);
      setTimer(30); // better UX than 5 min lock
    } catch (err) {
      alert("Failed to resend OTP");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[360px] rounded-2xl px-6 py-7 shadow-xl">

        <h2 className="text-[22px] font-semibold text-gray-900">
          Enter OTP
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          We’ve sent a 4-digit code to your email
        </p>

        {/* OTP INPUTS */}
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
              className="w-14 h-14 text-center text-xl font-semibold border rounded-xl focus:border-green-600 outline-none"
            />
          ))}
        </div>

        {/* VERIFY BUTTON */}
        <button
          disabled={!isOtpValid}
          onClick={handleSubmit}
          className={`w-full mt-8 py-3 rounded-xl font-semibold
            ${isOtpValid
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Verify & Continue
        </button>

        {/* RESEND */}
        <button
          onClick={handleResendOtp}
          disabled={resendDisabled}
          className={`mt-4 text-sm font-medium ${
            resendDisabled
              ? "text-gray-400"
              : "text-green-600 hover:underline"
          }`}
        >
          {resendDisabled ? `Resend in ${timer}s` : "Resend OTP"}
        </button>

      </div>
    </div>
  );
};

export default VerifyOtp;