import TheAside from "./TheAside.vue";
import TheHeader from "./TheHeader.vue";
import TheMain from "./TheMain.vue";
import TheFooter from "./TheFooter";
import TheControlAside from "./TheControlAside.vue";

export default {
  install: Vue => {
    Vue.component("WyTheAside", TheAside);
    Vue.component("WyTheHeader", TheHeader);
    Vue.component("WyTheMain", TheMain);
    Vue.component("WyTheFooter", TheFooter);
    Vue.component("WyTheControlAside", TheControlAside);
  }
};
