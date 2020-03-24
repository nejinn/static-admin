import http from "../http/http.js";

export default {
  // 获取task数据
  getTaskList: function(obj, data) {
    const url = "/AdminApi/get_tasks_list";
    http.wyPost(url, data).then(
      response => {
        obj.items = response.data.list;
        obj.total = response.data.count;
      },
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

  // 脚本操作
  taskScriptAction: function(obj, data) {
    const url = "/AdminApi/handle_task";
    http.wyPost(url, data).then(
      // eslint-disable-next-line no-unused-vars
      response => {
        const message = data.handle === 1 ? "启动脚本成功" : "停止脚本成功";
        const variant = data.handle === 1 ? "success" : "danger";
        const toastVnode = {
          message: message,
          variant: variant,
          title: "操作成功",
          content: message
        };
        obj.$WYToast.Toast(obj, toastVnode);
      },
      err => {
        const message = data.handle === 1 ? "启动脚本成功" : "停止脚本成功";
        const toastVnode = {
          message: message,
          variant: "warning",
          title: "操作失败",
          content: err.msg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  },

  // 新增脚本
  addTaskScritp: function(obj, data) {
    const url = "/AdminApi/add_task";
    http.wyPost(url, data).then(
      // eslint-disable-next-line no-unused-vars
      response => {
        const toastVnode = {
          message: "新增成功",
          variant: "success",
          title: "操作成功",
          content: "新增成功"
        };
        obj.$WYToast.Toast(obj, toastVnode);
      },
      err => {
        const toastVnode = {
          message: "新增失败",
          variant: "warning",
          title: "操作失败",
          content: err.msg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  },

  // 刷新卡片数据
  getCardTaskList: function(obj, data) {
    const url = "/AdminApi/get_tasks_list";
    http.wyPost(url, data).then(
      response => {
        obj.items = response.data.list;
        obj.total = response.data.count;

        const toastVnode = {
          message: "刷新成功",
          variant: "success",
          title: "操作成功",
          content: obj.cardHeaderTitle
        };
        obj.$WYToast.Toast(obj, toastVnode);
      },
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

  // 查询survey数据
  queryTaskList: function(obj, data) {
    const url = "/AdminApi/get_tasks_list";
    http.wyPost(url, data).then(
      response => {
        obj.items = response.data.list;
        obj.total = response.data.count;
        const filterKeyWord =
          obj.filterForm.keyWord === ""
            ? "搜索关键词-未填写"
            : `搜索关键词-${obj.filterForm.keyWord}`;
        const filterScriptStatus =
          obj.filterForm.scriptStatus === 0
            ? "脚本状态-停止"
            : obj.filterForm.scriptStatus === 1
            ? "脚本状态-运行中"
            : obj.filterForm.scriptStatus === 2
            ? "脚本状态-报错"
            : "脚本状态-未填写";

        const filterIsScript =
          obj.filterForm.isScript === 0
            ? "是否有脚本-无"
            : obj.filterForm.isScript === 1
            ? "是否有脚本-有"
            : "是否有脚本-未选择";
        const toastVnode = {
          message: "查询成功",
          variant: "success",
          title: "操作成功",
          content: `查询条件为: ${filterKeyWord} 和 ${filterScriptStatus} 和 ${filterIsScript} 的数据`
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
  refreshTaskList: function(obj, data) {
    const url = "/AdminApi/get_tasks_list";
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
        obj.$WYToast.Toast(obj, toastVnode);
      },
      err => {
        const toastVnode = {
          message: "刷新失败",
          variant: "warning",
          title: "操作失败",
          content: err.msg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  },

  // 删除数据
  deleteTaskDetail: function(obj, data) {
    const url = "/AdminApi/delete_task";
    http.wyPost(url, data).then(
      // eslint-disable-next-line no-unused-vars
      response => {
        const toastVnode = {
          message: "删除成功",
          variant: "success",
          title: "操作成功",
          content: obj.deleteData.name
        };
        obj.$WYToast.Toast(obj, toastVnode);
        obj.deleteData = {
          id: "",
          name: ""
        };

        const nextUrl = "//AdminApi/get_tasks_list";
        const nextParams = {
          projectName: obj.filterForm.projectName,
          isDetect:
            obj.filterForm.isDetect == "是"
              ? 1
              : obj.filterForm.isDetect == "否"
              ? 0
              : ""
        };
        http.wyPost(nextUrl, nextParams).then(nextResponse => {
          const nextTotal = nextResponse.data.count;
          const nextTotalPages = Math.ceil(nextTotal / obj.perPageSize);
          // const totalPages = Math.ceil(obj.total / obj.perPageSize);
          // const nextCurrentPage =
          //   nextTotalPages < totalPages ? nextTotalPages : totalPages;
          const nextCurrentPage =
            obj.currentPage < nextTotalPages ? obj.currentPage : nextTotalPages;

          obj.currentPage = nextCurrentPage;
          const lastParams = {
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
        const toastVnode = {
          message: "删除失败",
          variant: "warning",
          title: "操作失败",
          content: err.msg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  }
};
