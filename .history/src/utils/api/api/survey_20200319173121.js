import http from "../http/http.js";

export default {
  // 获取survey数据
  getSurveyList: function(obj, data) {
    const url = "/AdminApi/get_project_detect";
    http.wyPost(url, data).then(
      response => {
        obj.items = response.data.list;
        obj.total = response.data.count;

        // obj.$store.commit("setSurveyManageDataCurrentPage", obj.currentPage);
        // obj.$store.commit("setSurveyManageDataPerPageSize", obj.perPageSize);
        // obj.$store.commit("setSurveyManageDataKeyWord", obj.keyWord);
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        const toastVnode = {
          message: "获取失败",
          variant: "warning",
          title: "操作失败",
          content: err.msg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  },

  // 查询survey数据
  querySurveyList: function(obj, data) {
    const url = "/AdminApi/get_project_detect";
    http.wyPost(url, data).then(
      response => {
        obj.items = response.data.list;
        obj.total = response.data.count;

        // obj.$store.commit("setSurveyManageDataCurrentPage", 1);
        // obj.$store.commit("setSurveyManageDataKeyWord", obj.keyWord);
        const toastVnode = {
          message: "查询成功",
          variant: "success",
          title: "操作成功",
          content: `查询关键词为: ${obj.keyWord}  的数据`
        };
        obj.$WYToast.Toast(obj, toastVnode);
      },
      err => {
        const toastVnode = {
          message: "查询失败",
          variant: "warning",
          title: "操作失败",
          content: err.msg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  },

  // 刷新当页数据
  refreshSurveyList: function(obj, data) {
    const url = "/AdminApi/get_project_detect";
    http.wyPost(url, data).then(
      response => {
        obj.items = response.data.list;
        obj.total = response.data.count;

        const toastVnode = {
          message: "刷新成功",
          variant: "success",
          title: "操作成功",
          content: "刷新数据"
        };
        obj.$store.commit("setSurveyManageDataCurrentPage", obj.currentPage);
        obj.$store.commit("setSurveyManageDataKeyWord", obj.keyWord);
        obj.$WYToast.Toast(obj, toastVnode);
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        const toastVnode = {
          message: "刷新失败",
          variant: "success",
          title: "操作失败",
          content: err.msg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  },

  // 刷新卡片数据
  getCardSurveyList: function(obj, data) {
    const url = "/AdminApi/get_project_detect";
    http.wyPost(url, data).then(
      response => {
        obj.items = response.data.list;
        obj.total = response.data.count;

        // obj.$store.commit("setSurveyManageDataCurrentPage", 1);

        // obj.$store.commit("setSurveyManageDataKeyWord", "");

        const toastVnode = {
          message: "刷新成功",
          variant: "success",
          title: "操作成功",
          content: obj.cardHeaderTitle
        };
        obj.$WYToast.Toast(obj, toastVnode);
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        const toastVnode = {
          message: "刷新失败",
          variant: "success",
          title: "操作失败",
          content: err.msg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  },

  // 获取数据详情
  getSurveyDetail: function(obj, data) {
    const url = "/AdminApi/detect_info";
    http.wyPost(url, data).then(
      response => {
        obj.detailData = response.data;
      },
      err => {
        const toastVnode = {
          message: "获取失败",
          variant: "warning",
          title: "操作失败",
          content: err.mg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  },

  // 修改数据
  editorSurveyDetail: function(obj, data) {
    const url = "/AdminApi/edit_detect";
    http.wyPost(url, data).then(
      // eslint-disable-next-line no-unused-vars
      response => {
        obj.$router.push({
          name: "SurveyView",
          params: { id: obj.$route.params.id, name: obj.$route.params.name }
        });
        const toastVnode = {
          message: "修改成功",
          variant: "success",
          title: "操作成功",
          content: obj.$route.params.name + "修改成功"
        };
        setTimeout(() => {
          obj.$WYToast.Toast(obj, toastVnode);
        }, 1000);
      },
      err => {
        const toastVnode = {
          message: "修改失败",
          variant: "warning",
          title: "操作失败",
          content: err.msg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  },

  // 上传探测脚本
  uploadProjectData: function(obj, data) {
    const url = "/AdminApi/upload_script";
    http.wyPost(url, data).then(
      response => {
        obj.aysnFiles = response.data;
        obj.detailData.detectScript = response.data.file_url;
      },

      err => {
        const toastVnode = {
          message: "检查失败",
          variant: "warning",
          title: "操作失败",
          content: err.msg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  }
};
