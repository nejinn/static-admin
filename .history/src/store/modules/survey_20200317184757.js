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
  getSurveyManageFilterKeyWord(state) {
    return state.manageData.keyWord;
  }
};

const mutations = {
  setManageDataCurrentPage(state, payload) {
    state.manageData.currentPage = payload;
  },
  setLManageDataCurrentPageData(state, payload) {
    state.manageData.currentPageData = payload;
  },
  setLManageDataPerPageSize(state, payload) {
    state.manageData.perPageSize = payload;
  },
  setLManageDataFilterFormProjectName(state, payload) {
    state.manageData.filterForm.projectName = payload;
  },
  setLManageDataFilterFormIsDetect(state, payload) {
    state.manageData.filterForm.isDetect = payload;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
