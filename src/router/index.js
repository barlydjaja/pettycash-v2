import Vue from "vue";
import VueRouter from "vue-router";
import loginRouter from "./Login";
import transactionRouter from "./Transaction";
import approvalRouter from "./Approval";
import deletedRouter from "./Deleted";
import editedRouter from "./Edited";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    ...loginRouter,
    ...transactionRouter,
    ...approvalRouter,
    ...deletedRouter,
    ...editedRouter,
  ],
});

export default router;
