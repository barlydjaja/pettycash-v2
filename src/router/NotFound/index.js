export default [
  {
    path: "*",
    name: "NotFound",
    component: (resolve) => require(["@/views/NotFound"], resolve),
    meta: {
      title: "Page Not Found",
    },
  },
];
