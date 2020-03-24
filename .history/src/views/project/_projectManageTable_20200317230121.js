export default {
  name: "项目管理",
  fields: [
    { key: "isSelected", label: "选中", class: "text-center text-info" },
    { key: "index", label: "序号", class: "text-center" },
    { key: "projectId", label: "id", class: "text-center" },
    { key: "projectName", label: "名称", sortable: true },
    { key: "projectSource", label: "项目来源", sortable: true },
    {
      key: "isDetect",
      label: "是否探测",
      class: "text-center",
      sortable: true,
      formatter: value => {
        return value == "已探测" ? "是" : "否";
      }
    },
    {
      key: "progressBar",
      label: "进度",
      class: "text-center",
      sortable: true,
      formatter: value => {
        return parseInt(value);
      }
      // tdClass: value => {
      //   console.log(parseInt(value));
      //   return parseInt(value) === 100
      //     ? "text-success"
      //     : parseInt(value) < 100 && parseInt(value) >= 90
      //     ? "text-info"
      //     : parseInt(value) < 90 && parseInt(value) >= 80
      //     ? "text-warning"
      //     : parseInt(value) < 80 && parseInt(value) >= 60
      //     ? "text-primary"
      //     : parseInt(value) == 0
      //     ? "text-danger"
      //     : "text-dark";
      // }
    },
    { key: "taskTotal", label: "总任务", class: "text-center" },
    { key: "taskFull", label: "已完成任务", class: "text-center" },
    { key: "failed_tasks", label: "失败任务", class: "text-center" },
    { key: "action", label: "操作", class: "text-center" }
  ]
};
