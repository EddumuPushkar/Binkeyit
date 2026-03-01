export const baseURL = "http://localhost:8080";

const SummaryApi = {
  login: {
    url: "/api/user/login",
    method: "POST",
  },
  verifyOtp: {
    url: "/api/user/verify-otp",
    method: "POST",
  },
  
};

export default SummaryApi;

//Note => No use of this file .
//instead of this file we are using axios.js file for api calls.