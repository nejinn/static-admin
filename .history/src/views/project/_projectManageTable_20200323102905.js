export default {
  name: "项目管理",
  fields: [
    { key: "isSelected", label: "选中", class: "text-center text-info" },
    { key: "index", label: "序号", class: "text-center" },
    { key: "projectId", label: "id", class: "text-center" },
    { key: "projectName", label: "名称", sortable: true, class: "text-center" },
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
    },
    { key: "taskTotal", label: "总任务", class: "text-center" },
    { key: "taskFull", label: "已完成任务", class: "text-center" },
    { key: "failed_tasks", label: "失败任务", class: "text-center" },
    { key: "action", label: "操作", class: "text-center" }
  ]
};
