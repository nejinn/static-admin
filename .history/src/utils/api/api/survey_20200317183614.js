import http from "../http/http.js";

export default {
  // 获取project数据
  getSurveyList: function(obj, data) {
    let url = "/AdminApi/get_project_list/";
    http.wyPost(url, data).then(
      response => {
        obj.items = response.list;
        obj.total = response.count;

        obj.$store.commit("setManageDataCurrentPage", obj.currentPage);

        obj.$store.commit(
          "setLManageDataFilterFormProjectName",
          obj.filterForm.projectName
        );
        obj.$store.commit(
          "setLManageDataFilterFormIsDetect",
          obj.filterForm.isDetect
        );
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
  }
};
