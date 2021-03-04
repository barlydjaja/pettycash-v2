export default [
  {
    path: "transaction-history",
    name: "TransactionHistory",
    component: (resolve) =>
      require(["@/views/PettyCash/TransactionHistory"], resolve),
    meta: {
      title: "Sejarah Transaksi",
    },
  },
];
