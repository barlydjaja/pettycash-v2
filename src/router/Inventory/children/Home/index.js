export default [
  {
    path: "",
    name: "InventoryHome",
    component: (resolve) => require(["@/views/Inventory/Home"], resolve),
    meta: {
      title: "Inventory Home Page",
    },
  },
];
