export default [
  {
    path: "",
    name: "Home",
    component: (resolve) => require(["@/views/PettyCash/Home"], resolve),
    meta: {
      title: "Petty Cash Home Page",
    },
  },
];
