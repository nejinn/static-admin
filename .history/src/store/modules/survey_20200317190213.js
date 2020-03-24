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
  getSurveyManageCurrentPageData(state) {
    return state.manageData.currentPageData;
  },
  getSurveyManagePerPageSize(state) {
    return state.manageData.perPageSize;
  },
  getSurveyManageKeyWord(state) {
    return state.manageData.keyWord;
  }
};

const mutations = {
  setSurveyManageCurrentPage(state, payload) {
    state.manageData.currentPage = payload;
  },
  setSurveyManageCurrentPageData(state, payload) {
    state.manageData.currentPageData = payload;
  },
  setSurveyManagePerPageSize(state, payload) {
    state.manageData.perPageSize = payload;
  },
  setSurveyManageKeyWord(state, payload) {
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
