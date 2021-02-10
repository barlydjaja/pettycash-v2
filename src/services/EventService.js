import axios from "axios";
import api from "@/api";
import storage from "@/libs/storage";

const user = storage.get("user");
// console.log(user);

const apiClient = axios.create({
  baseURL: `http://10.69.72.99:8081/pettycash/`,
  timeout: 30000,
  headers: {
    Authorization: user ? `Bearer ${user.token}` : "",
    "content-type": "application/json",
  },
});

export default {
  // all post
  login(body) {
    return apiClient.post(api.login, body);
  },
  getAllTransactionsByMonthAndBranch(body) {
    return apiClient.post(api.viewAllTransactionsByMonthAndBranch, body);
  },
  addNewTransaction(body) {
    return apiClient.post(api.addNewTransaction, body);
  },
  updateTransaction(body, transactionId) {
    return apiClient.post(api.updateTransaction(transactionId), body);
  },
  updateNotApprovedTransaction(body) {
    return apiClient.post(api.updateNotApprovedTransaction, body);
  },
  uploadPhoto(body) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "content-type": "multipart/form-data",
      },
    };
    return apiClient.post(api.uploadPhoto, body, config);
  },
  uploadPendingPhoto(body) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "content-type": "multipart/form-data",
      },
    };
    return apiClient.post(api.uploadPendingPhoto, body, config);
  },

  // all get
  getNotApprovedTransactions(userId) {
    return apiClient.get(api.viewNotApprovedTransactions(userId));
  },
  getTransactionsByBranch(branch) {
    return apiClient.get(api.viewApprovedTransactions(branch));
  },
  deleteTransaction(transactionId, userId) {
    return apiClient.get(api.deleteTransaction(transactionId, userId));
  },
  downloadPhoto(transactionId) {
    return apiClient.get(api.downloadPhoto(transactionId));
  },
  approve(transactionId, userId) {
    return apiClient.get(api.approve(transactionId, userId));
  },
  rejectApprove(transactionId) {
    return apiClient.get(api.rejectApprove(transactionId));
  },
};
