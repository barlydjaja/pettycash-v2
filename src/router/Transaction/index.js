export default [
  {
    path: "/transaction",
    name: "Transaction",
    component: (resolve) => require(["@/views/Transaction"], resolve),
    meta: {
      title: "Transaksi",
    },
  },
];
