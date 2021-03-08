import HomeRoute from "./children/Home";
import TransactionHistoryRoute from "./children/TransactionHistory";
import approvalRoute from "./children/Approval";
import deleteRoute from "./children/Deleted";
import editRoute from "./children/Edited";

export default [
  {
    path: "/pettycash",
    component: (resolve) => require(["@/views/PettyCash"], resolve),
    children: [
      ...HomeRoute,
      ...TransactionHistoryRoute,
      ...approvalRoute,
      ...deleteRoute,
      ...editRoute,
    ],
    meta: {
      title: "Petty Cash",
      requiresAuth: true,
    },
  },
];
