export default {
  data: [
    {
      code: "",
      name: "仪表盘",
      icon: "fa fa-dashboard",
      activeProof: "/dashboard",
      itemRouter: "/dashboard",
      children: ""
    },
    {
      code: "",
      name: "项目管理",
      icon: "fa fa-bitbucket-square",
      activeProof: "project",
      children: [
        {
          code: "",
          name: "项目列表",
          icon: "fa fa-product-hunt",
          activeProof: "/project/manage",
          itemRouter: "/project/manage"
        },
        {
          code: "",
          name: "项目入库",
          icon: "fa fa-archive",
          activeProof: "/project/store",
          itemRouter: "/project/store"
        }
      ]
    },
    {
      code: "",
      name: "探测管理",
      icon: "fa fa-product-hunt",
      activeProof: "/survey/project",
      children: [
        {
          code: "",
          name: "探测列表",
          icon: "fa fa-product-hunt",
          activeProof: "/survey/project",
          itemRouter: "/survey/project"
        }
      ]
    }
  ]
};
