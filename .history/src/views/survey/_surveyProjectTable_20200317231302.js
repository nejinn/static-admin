export default {
  name: "探测列表",
  fields: [
    { key: "isSelected", label: "选中", class: "text-center text-info" },
    { key: "index", label: "序号", class: "text-center" },
    { key: "detectId", label: "id", class: "text-center" },
    { key: "projectName", label: "名称", sortable: true },
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
      key: "isLogin",
      label: "需要登录",
      class: "text-center",
      sortable: true
    },
    {
      key: "scriptStatus",
      label: "脚本状态",
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
