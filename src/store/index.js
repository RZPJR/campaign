import Vue from "vue";
import Vuex from "vuex";

import pagination from "./modules/pagination";
import banner from "./modules/banner";
import itemsection from "./modules/itemsection";
import notification from "./modules/notification";

Vue.use(require('vue-moment'));
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        pagination,
        banner,
        itemsection,
        notification
    }
});
