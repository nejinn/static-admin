import TheAside from "./TheAside.vue";
import TheHeader from "./TheHeader.vue";
import TheMain from "./TheMain.vue";
import TheFooter from "./TheFooter";
import TheControlAside from "./TheControlAside.vue";

export default {
  install: Vue => {
    Vue.component("NLY-TheAside", TheAside);
    Vue.component("NLY-TheHeader", TheHeader);
    Vue.component("NLY-TheMain", TheMain);
    Vue.component("NLY-TheFooter", TheFooter);
    Vue.component("NLY-TheControlAside", TheControlAside);
  }
};
