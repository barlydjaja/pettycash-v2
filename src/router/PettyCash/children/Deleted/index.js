export default [
  {
    path: "deleted",
    name: "Deleted",
    component: (resolve) => require(["@/views/PettyCash/Deleted"], resolve),
    meta: {
      title: "Transaction Delete Request",
    },
  },
];
