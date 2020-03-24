const state = {
  manageData: {
    currentPage: "",
    currentPageData: "",
    perPageSize: "",
    keyWord: ""
  }
};

const getters = {
  getSurveyManageDataCurrentPage(state) {
    return state.manageData.currentPage;
  },
  getSurveyManageDataCurrentPageData(state) {
    return state.manageData.currentPageData;
  },
  getSurveyManageDataPerPageSize(state) {
    return state.manageData.perPageSize;
  },
  getSurveyManageDataKeyWord(state) {
    return state.manageData.keyWord;
  }
};

const mutations = {
  setSurveyManageDataCurrentPage(state, payload) {
    state.manageData.currentPage = payload;
  },
  setSurveyManageDataCurrentPageData(state, payload) {
    state.manageData.currentPageData = payload;
  },
  setSurveyManageDataPerPageSize(state, payload) {
    state.manageData.perPageSize = payload;
  },
  setSurveyManageDataKeyWord(state, payload) {
    state.manageData.keyWord = payload;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
