import http from "../http/http.js";

export default {
  // 获取survey数据
  getSurveyList: function(obj, data) {
    let url = "/AdminApi/get_project_detect";
    http.wyPost(url, data).then(
      response => {
        obj.items = response.list;
        obj.total = response.count;

        obj.$store.commit("setSurveyManageCurrentPage", obj.currentPage);

        obj.$store.commit("setSurveyManageKeyWord", obj.keyWord);
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        let message = "获取失败";
        let variant = "warning";
        let title = "操作失败";
        let content = err.msg;
        obj.$WYToast.Toast(obj, message, variant, title, content);
      }
    );
  },

  // 查询survey数据
  querySurveyList: function(obj, data, toastData) {
    let url = "/AdminApi/get_project_detect";
    http.wyPost(url, data).then(
      response => {
        obj.items = response.list;
        obj.total = response.count;
        obj.currentPage = 1;

        obj.$store.commit("setSurveyManageCurrentPage", 1);

        obj.$store.commit(
          "setProjectManageDataFilterFormProjectName",
          obj.filterForm.projectName
        );
        obj.$store.commit(
          "setProjectManageDataFilterFormIsDetect",
          obj.filterForm.isDetect
        );
        obj.$WYToast.Toast(
          obj,
          toastData.message,
          toastData.variant,
          toastData.title,
          toastData.content
        );
      },
      err => {
        let message = "查询失败";
        let variant = "warning";
        let title = "操作失败";
        let content = err.msg;
        obj.$WYToast.Toast(obj, message, variant, title, content);
      }
    );
  }
};
