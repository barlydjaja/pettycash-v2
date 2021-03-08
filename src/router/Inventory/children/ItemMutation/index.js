export default [
  {
    path: "item-mutation",
    name: "ItemMutation",
    component: (resolve) =>
      require(["@/views/Inventory/ItemMutation"], resolve),
    meta: {
      title: "Mutasi Barang",
    },
  },
];
