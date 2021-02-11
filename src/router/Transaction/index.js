import TransactionHistory from "./children/TransactionHistory";
import approvalRoute from "./children/Approval";
import deleteRoute from "./children/Deleted";
import editRoute from "./children/Edited";

export default [
  {
    path: "/transaction",
    component: (resolve) => require(["@/views/Transaction"], resolve),
    children: [
      ...TransactionHistory,
      ...approvalRoute,
      ...deleteRoute,
      ...editRoute,
    ],
    meta: {
      title: "Transaksi",
      requiresAuth: true,
    },
  },
];
