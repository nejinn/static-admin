const state = {
  manageData: {
    currentPage: "",
    currentPageData: "",
    perPageSize: "",
    filterForm: {
      projectName: "",
      isDetect: ""
    }
  }
};

const getters = {
  getProjectManageDataCurrentPage(state) {
    return state.manageData.currentPage;
  },
  getProjectManageDataCurrentPageData(state) {
    return state.manageData.currentPageData;
  },
  getProjectManageDataPerPageSize(state) {
    return state.manageData.perPageSize;
  },
  getProjectManageDataFilterFormProjectName(state) {
    return state.manageData.filterForm.projectName;
  },
  getProjectManageDataFilterFormIsDetect(state) {
    return state.manageData.filterForm.isDetect;
  }
};

const mutations = {
  setProjectManageDataCurrentPage(state, payload) {
    state.manageData.currentPage = payload;
  },
  setProjectManageDataCurrentPageData(state, payload) {
    state.manageData.currentPageData = payload;
  },
  setProjectManageDataPerPageSize(state, payload) {
    state.manageData.perPageSize = payload;
  },
  setProjectManageDataFilterFormProjectName(state, payload) {
    state.manageData.filterForm.projectName = payload;
  },
  setProjectManageDataFilterFormIsDetect(state, payload) {
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
