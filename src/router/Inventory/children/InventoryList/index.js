export default [
  {
    path: "inventory-list",
    name: "InventoryList",
    component: (resolve) =>
      require(["@/views/Inventory/InventoryList"], resolve),
    meta: {
      title: "List Inventory",
    },
  },
];
