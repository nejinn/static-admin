export default {
  name: "任务日志",
  fields: [
    {
      key: "isSelected",
      label: "选中",
      class: "text-center text-info"
    },
    { key: "index", label: "序号", class: "text-center" },
    { key: "logId", label: "id", class: "text-center" },
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
    { key: "handle", label: "当前操作", class: "text-left" },
    { key: "userId", label: "创建人", class: "text-center" },
    { key: "addTime", label: "创建时间", class: "text-center" },
    { key: "action", label: "操作", class: "text-center" }
  ]
};
