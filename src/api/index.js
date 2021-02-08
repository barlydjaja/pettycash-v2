const version = "v1";
const view = "view";

export default {
  login: "/secured/login",
  viewAllTransactionsByMonthAndBranch: `${version}/${view}/getPerYearMonthAndBranch`,
  viewApprovedTransactions(branch) {
    return `${version}/${view}/getTransactionsByBranch?branch=${branch.toUpperCase()}`;
  },
  exportToExcel: `${version}/export/transaction`,
  addNewTransaction: `${version}/transaction/add`,
  updateTransaction(transactionId) {
    return `${version}/transaction/update?transactionId=${transactionId}`;
  },
  deleteTransaction(transactionId, userId) {
    return `${version}/transaction/delete?transactionId=${transactionId}&userId=${userId}`;
  },
  uploadPhoto: `${version}/file/upload`,
  downloadPhoto(transactionId) {
    return `${version}/file/download/${transactionId}`;
  },
};
