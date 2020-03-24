export default {
  name: "项目探测",
  fields: [
    {
      key: "IsSelected",
      label: "选中",
      class: "text-center"
    },
    { key: "index", label: "序号", class: "text-center" },
    { key: "name", label: "名称", sortable: true },
    {
      key: "loginRequired",
      label: "需要登录",
      class: "text-center",
      sortable: true,
      tdClass: value => {
        return value == "是" ? "text-success" : "text-danger";
      }
    },
    {
      key: "scriptRequired",
      label: "需要脚本",
      class: "text-center",
      sortable: true,
      tdClass: value => {
        return value == "是" ? "text-success" : "text-danger";
      }
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
  ],
  items: [
    {
      id: 1,
      name: "原料系统",
      loginRequired: "是",
      scriptRequired: "是",
      surveyProgress: "70%",
      scriptStatus: "运行中",
      creator: "Admin",
      createDate: "2018-01-12"
    },
    {
      id: 2,
      name: "人事系统",
      loginRequired: "是",
      scriptRequired: "是",
      surveyProgress: "99%",
      scriptStatus: "运行中",
      creator: "Admin",
      createDate: "2018-01-12"
    },
    {
      id: 3,
      name: "财务系统",
      loginRequired: "是",
      scriptRequired: "是",
      surveyProgress: "80%",
      scriptStatus: "停止",
      creator: "Admin",
      createDate: "2018-01-12"
    },
    {
      id: 4,
      name: "合同系统",
      loginRequired: "是",
      scriptRequired: "是",
      surveyProgress: "40%",
      scriptStatus: "停止",
      creator: "Admin",
      createDate: "2018-01-12"
    },
    {
      id: 5,
      name: "和天下系统",
      loginRequired: "否",
      scriptRequired: "是",
      surveyProgress: "22%",
      scriptStatus: "停止",
      creator: "Admin",
      createDate: "2018-01-12"
    },
    {
      id: 6,
      name: "和包系统",
      loginRequired: "是",
      scriptRequired: "否",
      surveyProgress: "100%",
      scriptStatus: "停止",
      creator: "Admin",
      createDate: "2018-01-12"
    }
  ]
};
