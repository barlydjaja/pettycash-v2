import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import JwPagination from "jw-vue-pagination";
import VueAuthHref from "vue-auth-href";
import { BootstrapVue } from "bootstrap-vue";
import "element-ui/lib/theme-chalk/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });
Vue.use(BootstrapVue);
Vue.use(VueAuthHref);

Vue.component("jw-pagination", JwPagination);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
