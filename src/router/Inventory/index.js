import HomeRoute from "./children/Home";
import InventoryListRoute from "./children/InventoryList";
import ItemMutationRouter from "./children/ItemMutation";

export default [
  {
    path: "/inventory",
    component: (resolve) => require(["@/views/Inventory"], resolve),
    children: [...HomeRoute, ...InventoryListRoute, ...ItemMutationRouter],
    meta: {
      title: "Inventory App",
      requiresAuth: true,
    },
  },
];
