const version = "v1";
const view = "view";

export default {
  login: "/secured/login",
  viewAllTransactionsByMonthAndBranch: `${version}/${view}/getPerYearMonthAndBranch`,
  viewApprovedTransactions(branch) {
    return `${version}/${view}/getTransactionsByBranch?branch=${branch.toUpperCase()}`;
  },
  viewNotApprovedTransactions(userId) {
    return `${version}/${view}/not-approved-transaction?userId=${userId}`;
  },
  exportToExcel: `${version}/export/transaction`,
  addNewTransaction: `${version}/transaction/add`,
  updateTransaction(transactionId) {
    return `${version}/transaction/update?transactionId=${transactionId}`;
  },
  updateNotApprovedTransaction: `${version}/transaction/update-approve`,

  deleteTransaction(transactionId, userId) {
    return `${version}/transaction/delete?transactionId=${transactionId}&userId=${userId}`;
  },
  uploadPhoto: `${version}/file/upload`,
  uploadPendingPhoto: `${version}/file/upload-pending`,
  downloadPhoto(transactionId) {
    return `${version}/file/download/${transactionId}`;
  },
  // FIXME:belum kepakeVV
  approve(transactionId, userId) {
    return `${version}/transaction/approve?transactionId=${transactionId}&userId=${userId}`;
  },
  rejectApprove(transactionId) {
    return `${version}/transaction/reject-approve?transactionId=${transactionId}`;
  },
};
