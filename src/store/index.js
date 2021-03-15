import Vue from "vue";
import Vuex from "vuex";
import menu from "./modules/menu";
import item from "./modules/item"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        menu,
        item
    },
});
