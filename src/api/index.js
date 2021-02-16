const version = "v1";
const view = "view";
const transaction = "transaction";

export default {
  login: "/secured/login",

  // for view
  viewAllTransactionsByMonthAndBranch: `${version}/${view}/getPerYearMonthAndBranch`,
  viewApprovedTransactions(branch) {
    return `${version}/${view}/getTransactionsByBranch?branch=${branch.toUpperCase()}`;
  },
  viewNotApprovedTransactions(userId) {
    return `${version}/${view}/not-approved-transaction?userId=${userId}`;
  },
  pendingUpdate(userId) {
    return `${version}/${view}/pending-update?userId=${userId}`;
  },
  pendingDelete(userId) {
    return `${version}/${view}/pending-delete?userId=${userId}`;
  },

  // for control transaction
  addNewTransaction: `${version}/${transaction}/add`,
  updateNotApprovedTransaction: `${version}/${transaction}/update-approve`,
  editPending: `${version}/${transaction}/edit-pending`,
  updateTransaction(transactionId) {
    // update transaction
    return `${version}/${transaction}/update?transactionId=${transactionId}`;
  },
  deleteTransaction(transactionId, userId) {
    return `${version}/${transaction}/delete?transactionId=${transactionId}&userId=${userId}`;
  },
  approve(transactionId, userId) {
    // approve new transaction
    return `${version}/${transaction}/approve?transactionId=${transactionId}&userId=${userId}`;
  },
  approveUpdate(transactionId, userId) {
    // approve edited transaction
    return `${version}/${transaction}/approve-update?transactionId=${transactionId}&userId=${userId}`;
  },
  rejectApprove(transactionId) {
    return `${version}/${transaction}/reject-approve?transactionId=${transactionId}`;
  },
  rejectUpdate(transactionId) {
    return `${version}/${transaction}/reject-update?transactionId=${transactionId}`;
  },
  rejectDelete(transactionId) {
    return `${version}/${transaction}/reject-delete?transactionId=${transactionId}`;
  },

  //for photo
  uploadPhoto: `${version}/file/upload`,
  uploadPendingPhoto: `${version}/file/upload-pending`,
  downloadPhoto(transactionId) {
    return `${version}/file/download/${transactionId}`;
  },

  // for excel
  exportToExcel(userId) {
    return `${version}/export/transaction?userId=${userId}`;
  },
  deleteExcel: `${version}/export/delete-temp`,

  // for update user info
  updateUserInfo(userId) {
    return `${version}/profile/update?userId=${userId}`;
  },
};
