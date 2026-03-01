import React, { useState } from "react";
import Login from "./Login.jsx";
import VerifyOtp from "./VerifyOtp.jsx";
import api from "../api/axios.js";
import useLoginStore from "../zustand/loginStore.js";
import { useNavigate } from "react-router-dom";

function Login1() {
  const [step, setStep] = useState(1);
  const { email } = useLoginStore();
  const navigate = useNavigate();

  const handleOtp = async () => {
  
    await api
      .post("/user/login", { email })
      .then((response) => {
        if (response.data.success === true) {
          console.log(response.data);
          setStep(2);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleVerifyOtp = async (otp) => {
    await api
      .post("/user/verify-otp", { email, otp })
      .then((response) => {
        if (response.data.success === false) {
          alert("otp is wrong");
          return;
        }
        if (response.data.success === true) {
          localStorage.setItem("accessToken", response.data.data.accessToken);
          localStorage.setItem("refreshToken", response.data.data.refreshToken);
          console.log(response);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("tanish");
        console.log(error);
      });
  };

  return (
    <div>
      {step === 1 && <Login handleOtp={handleOtp} />}
      {step === 2 && <VerifyOtp handleVerifyOtp={handleVerifyOtp} />}
    </div>
  );
}

export default Login1;
