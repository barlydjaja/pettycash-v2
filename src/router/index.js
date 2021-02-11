import Vue from "vue";
import VueRouter from "vue-router";
import loginRouter from "./Login";
import transactionRouter from "./Transaction";
import hooks from "./hooks";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [...loginRouter, ...transactionRouter],
});

hooks(router);

export default router;
