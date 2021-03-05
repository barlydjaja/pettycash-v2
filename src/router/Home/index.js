export default [
  {
    path: "/home",
    name: "Home",
    component: (resolve) => require(["@/views/Home"], resolve),
    meta: {
      title: "Home Page",
    },
  },
];
