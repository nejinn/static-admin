import http from "../http/http.js";

export default {
  // 获取task数据
  getTaskList: function(obj, data) {
    const url = "/AdminApi/get_tasks_list";
    http.wyPost(url, data).then(
      response => {
        console.log(response);
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
  }
};
