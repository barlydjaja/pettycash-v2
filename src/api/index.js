const version = "v1";
const view = "view";

export default {
  login: "/secured/login",
  viewAllTransactionsByMonthAndBranch: `${version}/${view}/getPerYearMonthAndBranch`,
  viewApprovedTransactions(branch) {
    return `${version}/${view}/getTransactionsByBranch?branch=${branch.toUpperCase()}`;
  },
  exportToExcel: `${version}/export/transaction`,
};
