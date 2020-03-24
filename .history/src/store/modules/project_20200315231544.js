const state = {
  manageData: {
    currentPage: "",
    currentPageData: "",
    perPageSize: "",
    filterForm: {
      filterName: "",
      filterSurvey: ""
    }
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
  getLManageDataFilterFormFilterName(state) {
    return state.manageData.filterForm.filterName;
  },
  getLManageDataFilterFormFilterSurvey(state) {
    return state.manageData.filterForm.filterSurvey;
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
  setLManageDataFilterFormFilterName(state, payload) {
    state.manageData.filterForm.filterName = payload;
  },
  setLManageDataFilterFormFilterSurvey(state, payload) {
    state.manageData.filterForm.filterSurvey = payload;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
