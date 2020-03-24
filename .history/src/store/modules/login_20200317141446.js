import localstorage from "../../utils/localstorage";

const state = {
  // loginToken: localstorage.getLocalInfo("token")
  loginToken: ""
};

const getters = {
  getLoginToken(state) {
    return state.loginToken;
  }
};

const mutations = {
  setLoginUserInfo(state, payload) {
    state.loginToken = payload;
    localstorage.setLocalInfo("token", payload);
  },
  clearLoginUserInfo(state) {
    state.loginToken = "";
    localstorage.clearLocalInfo("token");
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
