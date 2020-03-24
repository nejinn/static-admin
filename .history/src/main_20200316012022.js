import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import { NlyAdminlteVue } from "nly-adminlte-vue";
Vue.use(NlyAdminlteVue);
import "nly-adminlte-vue/dist/adminlte/css/adminlte.css";
import "nly-adminlte-vue/dist/adminlte/fontawesome-free/css/all.css";
import "nly-adminlte-vue/dist/adminlte/icon/iconfont.css";
import "nly-adminlte-vue/dist/nly-adminlte-vue.css";

import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import wylayoutcomponent from "./views/layout";
Vue.use(wylayoutcomponent);

import WYttp from "./utils/api";
Vue.prototype.$WYttp = WYttp;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
