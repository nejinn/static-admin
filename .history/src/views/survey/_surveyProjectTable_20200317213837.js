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
      sortable: true,
      tdClass: value => {
        return value == "是" ? "text-success" : "text-danger";
      }
    },
    {
      key: "scriptStatus",
      label: "scriptStatus",
      class: "text-center",
      sortable: true
    },
    {
      key: "surveyProgress",
      label: "探测进度",
      class: "text-center",
      sortable: true,
      tdClass: value => {
        return parseInt(value) == 100
          ? "text-success"
          : parseInt(value) < 100 && parseInt(value) > 90
          ? "text-info"
          : parseInt(value) < 90 && parseInt(value) > 80
          ? "text-warning"
          : parseInt(value) < 80 && parseInt(value) > 60
          ? "text-primary"
          : parseInt(value) == 0
          ? "text-danger"
          : "text-dark";
      }
    },
    {
      key: "scriptStatus",
      label: "脚本状态",
      class: "text-center",
      sortable: true,
      tdClass: value => {
        return value == "运行中" ? "text-success" : "text-danger";
      }
    },
    { key: "creator", label: "创建人", class: "text-center" },
    { key: "createDate", label: "创建人", class: "text-center" },
    { key: "scriptAction", label: "脚本操作", class: "text-center" },
    { key: "action", label: "操作", class: "text-center" }
  ]
};
