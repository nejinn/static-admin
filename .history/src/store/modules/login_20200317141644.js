import localstorage from "../../utils/localstorage";

const state = {
  // loginToken: localstorage.getLocalInfo("token")
  loginToken: "e2b2da6ba0fd51b5749b1ed79cacdd0b"
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
