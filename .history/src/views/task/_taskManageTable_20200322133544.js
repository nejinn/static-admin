export default {
  name: "项目管理",
  fields: [
    { key: "isSelected", label: "选中", class: "text-center text-info" },
    { key: "index", label: "序号", class: "text-center" },
    { key: "taskId", label: "id", class: "text-center" },
    {
      key: "taskName",
      label: "任务名称",
      sortable: true,
      class: "text-center"
    },
    {
      key: "projectName",
      label: "项目名称",
      sortable: true,
      class: "text-center"
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
    {
      key: "isScript",
      label: "脚本",
      class: "text-center",
      sortable: true
    },
    { key: "scriptStatus", label: "脚本状态", class: "text-center" },
    { key: "handle", label: "当前操作", class: "text-left" },
    { key: "isLog", label: "查看日志", class: "text-center" },
    { key: "isLog", label: "失败任务", class: "text-center" },
    { key: "isLog", label: "失败任务", class: "text-center" },
    { key: "action", label: "操作", class: "text-center" }
  ]
};
