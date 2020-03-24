import TheAside from "./TheAside.vue";
import TheHeader from "./TheHeader.vue";
import TheMain from "./TheMain.vue";
import TheFooter from "./TheFooter";
import TheControlAside from "./TheControlAside.vue";

export default {
  install: Vue => {
    Vue.component("WyTheAside", TheAside);
    Vue.component("Wy-TheHeader", TheHeader);
    Vue.component("Wy-TheMain", TheMain);
    Vue.component("Wy-TheFooter", TheFooter);
    Vue.component("Wy-TheControlAside", TheControlAside);
  }
};
