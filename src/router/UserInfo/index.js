export default [
  {
    path: "/user-info",
    name: "UserInfo",
    component: (resolve) => require(["@/views/UserInfo"], resolve),
    meta: {
      title: "User Info",
      requiresAuth: true,
    },
  },
];
