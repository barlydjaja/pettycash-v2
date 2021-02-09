export default [
  {
    path: "",
    name: "TransactionHistory",
    component: (resolve) =>
      require(["@/views/Transaction/TransactionHistory"], resolve),
    meta: {
      title: "Sejarah Transaksi",
    },
  },
];
