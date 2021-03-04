export default [
  {
    path: "approval",
    name: "Approval",
    component: (resolve) => require(["@/views/PettyCash/Approval"], resolve),
    meta: {
      title: " New Transaction Approval Request",
    },
  },
];
