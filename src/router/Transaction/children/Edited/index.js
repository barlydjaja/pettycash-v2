export default [
  {
    path: "edited",
    name: "Edited",
    component: (resolve) => require(["@/views/Transaction/Edited"], resolve),
    meta: {
      title: "Transaction Edit Request",
    },
  },
];
