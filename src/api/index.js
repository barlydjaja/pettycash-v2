const version = "v1";

export default {
  login: "/secured/login",
  viewApprovedTransactions(branch) {
    return `${version}/view/getTransactionsByBranch?branch=${branch.toUpperCase()}`;
  },
};
