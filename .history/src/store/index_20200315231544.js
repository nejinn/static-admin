import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login.js";
// import containers from "./modules/containers.js";
import project from "./modules/project.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    project
  }
});
