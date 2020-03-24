import http from "../http/http.js";

export default {
  // 获取project数据
  getProjectList: function(obj, data) {
    let url = "/AdminApi/get_project_list/";
    http.wyPost(url, data).then(
      response => {
        obj.items = response.data.list;
        obj.total = response.data.count;

        obj.$store.commit("setManageDataCurrentPage", obj.currentPage);

        obj.$store.commit(
          "setLManageDataFilterFormFilterName",
          obj.filterForm.filterName
        );
        obj.$store.commit(
          "setLManageDataFilterFormFilterSurvey",
          obj.filterForm.filterSurvey
        );
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        let message = "获取失败";
        let variant = "warning";
        let title = "操作失败";
        let content = "获取数据失败";
        obj.$WYToast.Toast(obj, message, variant, title, content);
      }
    );
  },

  // 查询project数据
  queryProjectList: function(obj, data, toastData) {
    let url = "/api/projectlist/";
    http.wyPost(url, data).then(
      response => {
        obj.items = response.data.list;
        obj.total = response.data.count;
        obj.currentPage = 1;

        obj.$store.commit("setManageDataCurrentPage", 1);

        obj.$store.commit(
          "setLManageDataFilterFormFilterName",
          obj.filterForm.filterName
        );
        obj.$store.commit(
          "setLManageDataFilterFormFilterSurvey",
          obj.filterForm.filterSurvey
        );
        obj.$WYToast.Toast(
          obj,
          toastData.message,
          toastData.variant,
          toastData.title,
          toastData.content
        );
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        let message = "查询失败";
        let variant = "warning";
        let title = "操作失败";
        let content = "查询数据失败";
        obj.$WYToast.Toast(obj, message, variant, title, content);
      }
    );
  },

  // 刷新当页数据
  refreshProjectList: function(obj, data, toastData) {
    let url = "/AdminApi/get_project_list";
    http.wyPost(url, data).then(
      response => {
        obj.items = response.data.list;
        obj.total = response.data.count;

        obj.$WYToast.Toast(
          obj,
          toastData.message,
          toastData.variant,
          toastData.title,
          toastData.content
        );
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        let message = "刷新失败";
        let variant = "warning";
        let title = "操作失败";
        let content = "刷新数据失败";
        obj.$WYToast.Toast(obj, message, variant, title, content);
      }
    );
  },

  // 刷新卡片数据
  refreshCardProjectList: function(obj, data, toastData) {
    let url = "/AdminApi/get_project_list";
    http.wyGetList(url, data).then(
      response => {
        obj.items = response.results;
        obj.total = response.count;
        obj.currentPage = 1;

        obj.$WYToast.Toast(
          obj,
          toastData.message,
          toastData.variant,
          toastData.title,
          toastData.content
        );
        obj.items = response.data.list;
        obj.total = response.data.count;
        obj.$store.commit("setManageDataCurrentPage", obj.currentPage);

        obj.$store.commit(
          "setLManageDataFilterFormFilterName",
          obj.filterForm.filterName
        );
        obj.$store.commit(
          "setLManageDataFilterFormFilterSurvey",
          obj.filterForm.filterSurvey
        );
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        let message = "刷新失败";
        let variant = "warning";
        let title = "操作失败";
        let content = "刷新数据失败";
        obj.$WYToast.Toast(obj, message, variant, title, content);
      }
    );
  },
  // 获取数据详情
  getProjectDetail: function(obj, data) {
    let url = "/AdminApi/project_info";
    http.wyPost(url, data).then(
      response => {
        obj.detailData = response.data;
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        let message = "获取失败";
        let variant = "warning";
        let title = "操作失败";
        let content = "获取数据失败";
        obj.$WYToast.Toast(obj, message, variant, title, content);
      }
    );
  },
  // 修改数据
  editorPojectDetailData: function(obj, data, toastData) {
    let url = "/AdminApi/edit_project";
    http.wyPost(url, data).then(
      // eslint-disable-next-line no-unused-vars
      response => {
        obj.$router.push({
          name: "ProjectView",
          params: { id: obj.$route.params.id, name: obj.$route.params.name }
        });
        setTimeout(() => {
          obj.$WYToast.Toast(
            obj,
            toastData.message,
            toastData.variant,
            toastData.title,
            toastData.content
          );
        }, 1000);
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        let message = "获取失败";
        let variant = "warning";
        let title = "操作失败";
        let content = "获取数据失败";
        obj.$WYToast.Toast(obj, message, variant, title, content);
      }
    );
  },
  // 修改数据
  createPojectDetailData: function(obj, data, toastData) {
    let url = "/AdminApi/edit_project";
    http.wyPost(url, data).then(
      // eslint-disable-next-line no-unused-vars
      response => {
        obj.$router.push({
          name: "ProjectView",
          params: { id: obj.$route.params.id, name: obj.$route.params.name }
        });
        setTimeout(() => {
          obj.$WYToast.Toast(
            obj,
            toastData.message,
            toastData.variant,
            toastData.title,
            toastData.content
          );
        }, 1000);
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        let message = "获取失败";
        let variant = "warning";
        let title = "操作失败";
        let content = "获取数据失败";
        obj.$WYToast.Toast(obj, message, variant, title, content);
      }
    );
  }
};
