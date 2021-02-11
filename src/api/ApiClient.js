import storage from "@/libs/storage";
import axios from "axios";

export default () => {
  const apiClient = axios.create({
    baseURL: `http://10.69.72.99:8081/pettycash/`,
    timeout: 30000,
    headers: {
      // Authorization: user ? `Bearer ${user.token}` : "",
      "content-type": "application/json",
    },
  });
  apiClient.interceptors.request.use(
    function(config) {
      if (storage.get("token"))
        config.headers.Authorization = `Bearer ${storage.get("token")}`;
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );
  return apiClient;
};
