import storage from "@/libs/storage";
import axios from "axios";

export default () => {
    const apiPettyCash = axios.create({
        baseURL: `http://10.69.72.99:8081/pettycash/`,
        timeout: 30000,
        headers: {
            "content-type": "application/json",
        },
    });
    apiPettyCash.interceptors.request.use(
        function (config) {
            if (storage.get("token"))
                config.headers.Authorization = `Bearer ${storage.get("token")}`;
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );
    return apiPettyCash;
};
