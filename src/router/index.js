import Vue from "vue";
import VueRouter from "vue-router";
import loginRouter from "./Login";
import transactionRouter from "./Transaction";
import userInfoRouter from "./UserInfo";
import hooks from "./hooks";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [...loginRouter, ...transactionRouter, ...userInfoRouter],
});

hooks(router);

export default router;
