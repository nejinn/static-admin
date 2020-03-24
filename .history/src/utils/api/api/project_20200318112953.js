import http from "../http/http.js";

export default {
  // 获取project数据
  getProjectList: function(obj, data) {
    let url = "/AdminApi/get_project_list";
    http.wyPost(url, data).then(
      response => {
        obj.items = response.data.list;
        obj.total = response.data.count;

        obj.$store.commit("setProjectManageDataCurrentPage", obj.currentPage);

        obj.$store.commit(
          "setProjectManageDataFilterFormProjectName",
          obj.filterForm.projectName
        );
        obj.$store.commit(
          "setProjectManageDataFilterFormIsDetect",
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
  },

  // 查询project数据
  queryProjectList: function(obj, data, toastData) {
    let url = "/AdminApi/get_project_list";
    http.wyPost(url, data).then(
      response => {
        obj.items = response.data.list;
        obj.total = response.data.count;
        obj.currentPage = 1;

        obj.$store.commit("setProjectManageDataCurrentPage", 1);

        obj.$store.commit(
          "setProjectManageDataFilterFormProjectName",
          obj.filterForm.projectName
        );
        obj.$store.commit(
          "setProjectManageDataFilterFormIsDetect",
          obj.filterForm.isDetect
        );
        const queryCriteriaProjectName =
          obj.filterForm.projectName == ""
            ? "未填写"
            : obj.filterForm.projectName;
        const queryCriteriaIsDetect =
          obj.filterForm.isDetect == "" ? "未选择" : obj.filterForm.isDetect;

        const toastData = {
          message: "搜索成功",
          variant: "success",
          title: "操作成功",
          content: `搜索条件为:包含项目名称 ${queryCriteriaProjectName} 和探测情况 ${queryCriteriaIsDetect} 的数据`
        };
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
        let content = err.msg;
        obj.$WYToast.Toast(obj, message, variant, title, content);
      }
    );
  },

  // 刷新卡片数据
  refreshCardProjectList: function(obj, data, toastData) {
    let url = "/AdminApi/get_project_list";
    http.wyGetList(url, data).then(
      response => {
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
        obj.$store.commit("setProjectManageDataCurrentPage", 1);

        obj.$store.commit("setProjectManageDataFilterFormProjectName", "");
        obj.$store.commit("setProjectManageDataFilterFormIsDetect", "");
      },
      err => {
        let message = "刷新失败";
        let variant = "warning";
        let title = "操作失败";
        let content = err.msg;
        obj.$WYToast.Toast(obj, message, variant, title, content);
      }
    );
  },

  // 获取数据详情
  getProjectDetail: function(obj, data) {
    let url = "/AdminApi/project_info";
    http.wyPost(url, data).then(
      response => {
        obj.detailData = response;
      },
      err => {
        let message = "获取失败";
        let variant = "warning";
        let title = "操作失败";
        let content = err.mg;
        obj.$WYToast.Toast(obj, message, variant, title, content);
      }
    );
  },

  // 修改数据
  editorPojectDetail: function(obj, data, toastData) {
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
      err => {
        let message = "修改失败";
        let variant = "warning";
        let title = "操作失败";
        let content = err.msg;
        obj.$WYToast.Toast(obj, message, variant, title, content);
      }
    );
  },
  // 入库数据
  createPojectDetail: function(obj, data, toastData) {
    let url = "/AdminApi/add_project";
    http.wyPost(url, data).then(
      // eslint-disable-next-line no-unused-vars
      response => {
        obj.$router.push({
          name: "ProjectManage"
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
        let message = "入库失败";
        let variant = "warning";
        let title = "操作失败";
        let content = err.msg;
        obj.$WYToast.Toast(obj, message, variant, title, content);
      }
    );
  },
  // 删除数据
  deletePojectDetail: function(obj, data, toastData) {
    let url = "/AdminApi/delete_project";
    http.wyPost(url, data).then(
      // 补充删除之后保持在原来页面，以及原来的搜索条件
      // eslint-disable-next-line no-unused-vars
      response => {
        obj.$WYToast.Toast(
          obj,
          toastData.message,
          toastData.variant,
          toastData.title,
          toastData.content
        );
        obj.deleteData = {
          id: "",
          name: ""
        };

        let nextUrl = "/AdminApi/get_project_list/";
        let nextParams = {
          projectName: obj.filterForm.projectName,
          isDetect:
            obj.filterForm.isDetect == "是"
              ? 1
              : obj.filterForm.isDetect == "否"
              ? 0
              : ""
        };
        http.wyPost(nextUrl, nextParams).then(nextResponse => {
          const nextTotal = nextResponse.count;
          const nextTotalPages = Math.ceil(nextTotal / obj.perPageSize);
          const totalPages = Math.ceil(obj.total / obj.perPageSize);
          const nextCurrentPage =
            nextTotalPages < totalPages ? nextTotalPages : totalPages;

          obj.currentPage = nextCurrentPage;
          let lastParams = {
            pageNum: nextCurrentPage,
            pageSize: obj.perPageSize,
            projectName: obj.filterForm.projectName,
            isDetect:
              obj.filterForm.isDetect == "是"
                ? 1
                : obj.filterForm.isDetect == "否"
                ? 0
                : ""
          };
          obj.$WYHttp.project.getProjectList(obj, lastParams);
        });
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        let message = "删除失败";
        let variant = "warning";
        let title = "操作失败";
        let content = err.msg;
        obj.$WYToast.Toast(obj, message, variant, title, content);
      }
    );
  },

  // 验证项目名称是否存在
  checkProjectNameUnique: function(obj, data) {
    let url = "/AdminApi/check_project_name";
    http.wyPost(url, data).then(
      // eslint-disable-next-line no-unused-vars
      response => {
        console.log(response);
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        console.log(err);
        let message = "检查失败";
        let variant = "warning";
        let title = "操作失败";
        let content = err.msg;
        obj.$WYToast.Toast(obj, message, variant, title, content);
      }
    );
  }
};
