import axios from "axios";
import api from "@/api";

const apiClient = axios.create({
  baseURL: `http://10.69.72.99:8081/pettycash/`,
  timeout: 30000,
});

export default {
  login(body) {
    // console.log(body);
    // console.log(api.login);
    return apiClient.post(api.login, body);
  },
  getTransactionsByBranch(branch, config) {
    return apiClient.get(api.viewApprovedTransactions(branch), config);
  },
};
