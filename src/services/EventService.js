import api from "@/api";
import storage from "@/libs/storage";
import apiClient from "@/api/ApiClient";
// const user = storage.get("user");
const token = storage.get("token");
// console.log(token);

export default {
  //axios Authorization token

  // all post
  login(body) {
    return apiClient().post(api.login, body);
  },
  getAllTransactionsByMonthAndBranch(body) {
    return apiClient().post(api.viewAllTransactionsByMonthAndBranch, body);
  },
  addNewTransaction(body) {
    return apiClient().post(api.addNewTransaction, body);
  },
  updateTransaction(body, transactionId) {
    return apiClient().post(api.updateTransaction(transactionId), body);
  },
  updateNotApprovedTransaction(body) {
    return apiClient().post(api.updateNotApprovedTransaction, body);
  },
  uploadPhoto(body) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    };
    // console.log(api.uploadPhoto);
    return apiClient().post(api.uploadPhoto, body, config);
  },
  uploadPendingPhoto(body) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    };
    return apiClient().post(api.uploadPendingPhoto, body, config);
  },
  editPending(body) {
    return apiClient().post(api.editPending, body);
  },
  exportToExcel(userId, body) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };
    // console.log(userId);
    return apiClient().post(api.exportToExcel(userId), body, config);
  },
  updateUserInfo(userId, body) {
    return apiClient().post(api.updateUserInfo(userId), body);
  },

  // all get
  getNotApprovedTransactions(userId) {
    return apiClient().get(api.viewNotApprovedTransactions(userId));
  },
  getTransactionsByBranch(branch) {
    return apiClient().get(api.viewApprovedTransactions(branch));
  },
  getPendingUpdate(userId) {
    return apiClient().get(api.pendingUpdate(userId));
  },
  deleteTransaction(transactionId, userId) {
    return apiClient().get(api.deleteTransaction(transactionId, userId));
  },
  downloadPhoto(transactionId) {
    return apiClient().get(api.downloadPhoto(transactionId));
  },
  approve(transactionId, userId) {
    return apiClient().get(api.approve(transactionId, userId));
  },
  rejectApprove(transactionId) {
    return apiClient().get(api.rejectApprove(transactionId));
  },
  rejectUpdate(transactionId) {
    return apiClient().get(api.rejectUpdate(transactionId));
  },
  approveUpdate(transactionId, userId) {
    return apiClient().get(api.approveUpdate(transactionId, userId));
  },
  pendingDelete(userId) {
    return apiClient().get(api.pendingDelete(userId));
  },
  deleteExcel() {
    return apiClient().get(api.deleteExcel);
  },
  rejectDelete(transactionId) {
    return apiClient().get(api.rejectDelete(transactionId));
  },

  // Authentication
  loggedIn() {
    const token = storage.get("token");

    return new Promise((resolve, reject) => {
      if (token) {
        resolve();
      } else {
        reject();
      }
    });
  },
};
