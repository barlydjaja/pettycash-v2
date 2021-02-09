import Vue from "vue";
import VueRouter from "vue-router";
import loginRouter from "./Login";
import transactionRouter from "./Transaction";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [...loginRouter, ...transactionRouter],
});

export default router;
