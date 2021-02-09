export default [
  {
    path: "deleted",
    name: "Deleted",
    component: (resolve) => require(["@/views/Transaction/Deleted"], resolve),
    meta: {
      title: "Transaction Delete Request",
    },
  },
];
