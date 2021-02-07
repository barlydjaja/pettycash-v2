import axios from "axios";
import api from "@/api";
import storage from "@/libs/storage";

const user = storage.get("user");
// console.log(user);

const apiClient = axios.create({
  baseURL: `http://10.69.72.99:8081/pettycash/`,
  timeout: 3000,
  headers: {
    Authorization: user ? `Bearer ${user.token}` : "",
  },
});

export default {
  // all post
  login(body) {
    // console.log(body);
    // console.log(api.login);
    return apiClient.post(api.login, body);
  },
  getAllTransactionsByMonthAndBranch(body) {
    return apiClient.post(api.viewAllTransactionsByMonthAndBranch, body);
  },

  // all get
  getTransactionsByBranch(branch) {
    return apiClient.get(api.viewApprovedTransactions(branch));
  },
};
