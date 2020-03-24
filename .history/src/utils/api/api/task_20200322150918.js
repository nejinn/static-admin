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
        console.log(response);
        console.log(data);
        const message = data.handle === 1 ? "启动脚本成功" : "停止脚本成功";
        const toastVnode = {
          message: message,
          variant: "success",
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
  }
};
