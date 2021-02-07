import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import JwPagination from "jw-vue-pagination";
import "element-ui/lib/theme-chalk/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });

Vue.component("jw-pagination", JwPagination);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
