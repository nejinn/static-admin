export default {
  name: "探测项目",
  fields: [
    { key: "isSelected", label: "选中", class: "text-center text-info" },
    { key: "index", label: "序号", class: "text-center" },
    { key: "resultId", label: "id", class: "text-center" },
    { key: "projectName", label: "名称", sortable: true, class: "text-center" },
    {
      key: "detectName",
      label: "任务名称",
      class: "text-center",
      sortable: true
    },
    {
      key: "userId",
      label: "创建人",
      class: "text-center",
      sortable: true
    },
    { key: "addTime", label: "创建时间", class: "text-center" },
    { key: "action", label: "操作", class: "text-center" }
  ]
};
