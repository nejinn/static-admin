export default {
  data: [
    {
      code: "",
      name: "仪表盘",
      icon: "nav-icon fas nlyfont nly-icon-color-palette",
      activeProof: "/dashboard",
      itemRouter: "/dashboard",
      children: ""
    },
    {
      code: "",
      name: "项目"
    },
    {
      code: "",
      name: "项目管理",
      icon: "nav-icon fas nlyfont nly-icon-logo-pinterest",
      activeProof: "project",
      children: [
        {
          code: "",
          name: "项目列表",
          icon: "nav-icon fas nlyfont nly-icon-byobu",
          activeProof: "/project/manage",
          itemRouter: "/project/manage"
        },
        {
          code: "",
          name: "项目入库",
          icon: "nav-icon fas nlyfont nly-icon-logo-xbox",
          activeProof: "/project/store",
          itemRouter: "/project/store"
        }
      ]
    },
    {
      code: "",
      name: "探测"
    },
    {
      code: "",
      name: "探测管理",
      icon: "nav-icon fas nlyfont nly-icon-logo-chrome",
      activeProof: "survey",
      children: [
        {
          code: "",
          name: "探测列表",
          icon: "nav-icon fas nlyfont nly-icon-logo-aperture",
          activeProof: "/survey/project",
          itemRouter: "/survey/project"
        },
        {
          code: "",
          name: "新增探测项目",
          icon: "nav-icon fas nlyfont nly-icon-logo-aperture",
          activeProof: "/survey/add",
          itemRouter: "/survey/add"
        }
      ]
    },
    {
      code: "",
      name: "任务"
    },
    {
      code: "",
      name: "任务管理",
      icon: "nav-icon fas nlyfont nly-icon-logo-chrome",
      activeProof: "task",
      children: [
        {
          code: "",
          name: "任务列表",
          icon: "nav-icon fas nlyfont nly-icon-logo-aperture",
          activeProof: "/task/manage",
          itemRouter: "/task/manage"
        },
        {
          code: "",
          name: "新增探测项目",
          icon: "nav-icon fas nlyfont nly-icon-logo-aperture",
          activeProof: "/task/add",
          itemRouter: "/task/add"
        }
      ]
    }
  ]
};
