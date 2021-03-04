import HomeRoute from "./children/Home";
import TransactionHistory from "./children/TransactionHistory";
import approvalRoute from "./children/Approval";
import deleteRoute from "./children/Deleted";
import editRoute from "./children/Edited";

export default [
  {
    path: "/pettycash",
    component: (resolve) => require(["@/views/PettyCash"], resolve),
    children: [
      ...HomeRoute,
      ...TransactionHistory,
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
