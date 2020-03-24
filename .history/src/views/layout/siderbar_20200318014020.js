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
        }
      ]
    }
  ]
};
