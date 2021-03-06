import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const TheContainer = () => import("../views/layout/TheContainer.vue");

const Dashboard = () => import("../views/dashboard/Dashboard.vue");

const ProjectManage = () => import("../views/project/ProjectManage.vue");

const routes = [
  {
    path: "/",
    name: "TheContainer",
    component: TheContainer,
    redirect: "/dashboard",
    meta: {
      title: "首页",
      requireLogin: true
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          title: "仪表盘",
          activeNav: "/dashboard",
          requireLogin: true,
          icon: "columns-gutters"
        }
      },
      {
        path: "project",
        name: "Project",
        redirect: "/project/manage/",
        component: {
          render(c) {
            return c("router-view");
          }
        },
        meta: {
          title: "项目",
          requireLogin: true,
          icon: "columns-gutters"
        },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
