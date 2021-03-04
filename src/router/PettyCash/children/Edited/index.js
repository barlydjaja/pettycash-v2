export default [
  {
    path: "edited",
    name: "Edited",
    component: (resolve) => require(["@/views/PettyCash/Edited"], resolve),
    meta: {
      title: "Transaction Edit Request",
    },
  },
];
