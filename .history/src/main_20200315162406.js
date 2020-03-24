import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import { NlyAminlteVue } from "nly-adminlte-vue";
Vue.use(NlyAminlteVue);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
