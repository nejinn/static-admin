export default {
  name: "任务列表",
  fields: [
    {
      key: "isSelected",
      label: "选中",
      stickyColumn: true,
      class: "text-center text-info"
    },
    { key: "index", label: "序号", stickyColumn: true, class: "text-center" },
    { key: "taskId", label: "id", stickyColumn: true, class: "text-center" },
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
    { key: "dataTotal", label: "数据量", class: "text-left" },
    { key: "isLog", label: "查看日志", class: "text-center" },
    { key: "userId", label: "创建人", class: "text-center" },
    { key: "addTime", label: "创建时间", class: "text-center" },
    { key: "scriptAction", label: "脚本操作", class: "text-center" },
    { key: "action", label: "操作", class: "text-center" }
  ]
};
