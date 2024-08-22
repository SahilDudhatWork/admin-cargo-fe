import axios from "axios";
import Cookies from "js-cookie";

const $axios = axios.create({
  baseURL: "https://cargo-connect-be.vercel.app",
  // baseURL: "http://localhost:4000",
});

$axios.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // config.headers["Content-Type"] = "multipart/form-data";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response.data;
  },
  (error) => {
    // Handle error response
    return Promise.reject(error);
  }
);

export default $axios;
