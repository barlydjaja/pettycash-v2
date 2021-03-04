import Vue from "vue";
import VueRouter from "vue-router";
import loginRouter from "./Login";
import pettyCashRouter from "./PettyCash";
import userInfoRouter from "./UserInfo";
import notFoundRouter from "./NotFound";
import hooks from "./hooks";
import userListRouter from "./UsersList";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    ...loginRouter,
    ...pettyCashRouter,
    ...userInfoRouter,
    ...notFoundRouter,
    ...userListRouter,
  ],
});

hooks(router);

export default router;
