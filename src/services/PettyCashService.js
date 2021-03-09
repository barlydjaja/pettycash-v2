import api from "@/api";
import storage from "@/libs/storage";
import apiPettyCash from "@/api/ApiPettyCash";
// const user = storage.get("user");
const token = storage.get("token");
// console.log(token);

export default {
  //axios Authorization token

  // all post
  login(body) {
    return apiPettyCash().post(api.login, body);
  },
  getAllTransactionsByMonthAndBranch(body) {
    return apiPettyCash().post(api.viewAllTransactionsByMonthAndBranch, body);
  },
  addNewTransaction(body) {
    return apiPettyCash().post(api.addNewTransaction, body);
  },
  updateTransaction(body, transactionId) {
    return apiPettyCash().post(api.updateTransaction(transactionId), body);
  },
  updateNotApprovedTransaction(body) {
    return apiPettyCash().post(api.updateNotApprovedTransaction, body);
  },
  uploadPhoto(body) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    };
    // console.log(api.uploadPhoto);
    return apiPettyCash().post(api.uploadPhoto, body, config);
  },
  uploadPendingPhoto(body) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    };
    return apiPettyCash().post(api.uploadPendingPhoto, body, config);
  },
  editPending(body) {
    return apiPettyCash().post(api.editPending, body);
  },
  exportToExcel(userId, body) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };
    // console.log(userId);
    return apiPettyCash().post(api.exportToExcel(userId), body, config);
  },
  updateUserInfo(userId, body) {
    return apiPettyCash().post(api.updateUserInfo(userId), body);
  },
  createNewUser(userId, body) {
    return apiPettyCash().post(api.register(userId), body);
  },
  updateRole(body) {
    return apiPettyCash().post(api.updateRole, body);
  },

  // all get
  getNotApprovedTransactions(userId) {
    return apiPettyCash().get(api.viewNotApprovedTransactions(userId));
  },
  getTransactionsByBranch(branch) {
    return apiPettyCash().get(api.viewApprovedTransactions(branch));
  },
  getPendingUpdate(userId) {
    return apiPettyCash().get(api.pendingUpdate(userId));
  },
  deleteTransaction(transactionId, userId) {
    return apiPettyCash().get(api.deleteTransaction(transactionId, userId));
  },
  downloadPhoto(transactionId) {
    return apiPettyCash().get(api.downloadPhoto(transactionId));
  },
  approve(transactionId, userId) {
    return apiPettyCash().get(api.approve(transactionId, userId));
  },
  rejectApprove(transactionId) {
    return apiPettyCash().get(api.rejectApprove(transactionId));
  },
  rejectUpdate(transactionId) {
    return apiPettyCash().get(api.rejectUpdate(transactionId));
  },
  approveUpdate(transactionId, userId) {
    return apiPettyCash().get(api.approveUpdate(transactionId, userId));
  },
  pendingDelete(userId) {
    return apiPettyCash().get(api.pendingDelete(userId));
  },
  deleteExcel() {
    return apiPettyCash().get(api.deleteExcel);
  },
  rejectDelete(transactionId) {
    return apiPettyCash().get(api.rejectDelete(transactionId));
  },
  getAllUsers(userId) {
    return apiPettyCash().get(api.allUsers(userId));
  },
  getAllRole() {
    return apiPettyCash().get(api.allRole);
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
