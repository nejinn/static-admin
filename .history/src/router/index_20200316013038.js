import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const TheContainer = () => import("../views/layout/TheContainer.vue");

const Login = () => import("../views/login/Login.vue");

const Dashboard = () => import("../views/dashboard/Dashboard.vue");

const ProjectManage = () => import("../views/project/ProjectManage.vue");
const ProjectView = () => import("../views/project/ProjectView.vue");
const ProjectEditor = () => import("../views/project/ProjectEditor.vue");
const ProjectStore = () => import("../views/project/ProjectStore.vue");
const ProjectSurvey = () => import("../views/project/ProjectSurvey.vue");

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录",
      icon: "columns-gutters"
    }
  },
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
        children: [
          {
            path: "manage",
            name: "ProjectManage",
            component: ProjectManage,
            meta: {
              title: "项目管理",
              activeNav: "/project/manage",
              containerActive: true,
              requireLogin: true,
              icon: "columns-gutters"
            }
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
