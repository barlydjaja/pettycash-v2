export default [
  {
    path: "/users-list",
    name: "UsersList",
    component: (resolve) => require(["@/views/UsersList"], resolve),
    meta: {
      title: "Users List",
    },
  },
];
