export default [
  {
    path: "approval",
    name: "Approval",
    component: (resolve) => require(["@/views/Transaction/Approval"], resolve),
    meta: {
      title: " New Transaction Approval Request",
    },
  },
];
