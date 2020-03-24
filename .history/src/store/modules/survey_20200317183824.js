const state = {
  manageData: {
    currentPage: "",
    currentPageData: "",
    perPageSize: "",
    keyWord: ""
  }
};

const getters = {
  getLManageDataCurrentPage(state) {
    return state.manageData.currentPage;
  },
  getLManageDataCurrentPageData(state) {
    return state.manageData.currentPageData;
  },
  getLManageDataPerPageSize(state) {
    return state.manageData.perPageSize;
  },
  getLManageDataFilterFormProjectName(state) {
    return state.manageData.filterForm.projectName;
  },
  getLManageDataFilterFormIsDetect(state) {
    return state.manageData.filterForm.isDetect;
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
