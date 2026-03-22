import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    console.log(localStorage.getItem("accessToken"));

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const token = localStorage.getItem("refreshToken");

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/user/refresh-token") //diniki mundu request vellakudadu appude avtadi.
        ) {
            originalRequest._retry = true;

            try {
              console.log("rtoken", token);
              
                const response = await api.post(
                    "/user/refresh-token",
                    {token},
                    // {
                    //   headers: { Authorization: `Bearer ${token}` },
                    // },
                    {withCredentials : true}
                );
                
                
                const newAccessToken = response.data.data.accessToken;
                console.log("ap", newAccessToken);
                localStorage.setItem("accessToken", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (err) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    },
);

export default api;
