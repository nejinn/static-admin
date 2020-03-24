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
          title: "项目管理",
          requireLogin: true,
          icon: "columns-gutters"
        },
        children: [
          {
            path: "manage",
            name: "ProjectManage",
            component: ProjectManage,
            meta: {
              title: "项目列表",
              activeNav: "/project/manage",
              containerActive: true,
              requireLogin: true,
              icon: "columns-gutters"
            },
            children: [
              {
                path: "view/:id/:name",
                name: "ProjectView",
                component: ProjectView,
                meta: {
                  title: "查看项目",
                  activeNav: "/project/manage",
                  containerActive: false,
                  requireLogin: true,
                  icon: "columns-gutters"
                }
              },
              {
                path: "editor/:id/:name",
                name: "ProjectEditor",
                component: ProjectEditor,
                meta: {
                  title: "修改项目",
                  activeNav: "/project/manage",
                  containerActive: false,
                  requireLogin: true,
                  icon: "columns-gutters"
                }
              }
            ]
          },
          {
            path: "store",
            name: "ProjectStore",
            component: ProjectStore,
            meta: {
              title: "项目入库",
              activeNav: "/project/store",
              requireLogin: true,
              icon: "columns-gutters"
            }
          }
        ]
      },
      {
        path: "survey",
        name: "ProjectSurvey",
        component: ProjectSurvey,
        meta: {
          title: "项目探测",
          activeNav: "/project/survey",
          containerActive: true,
          requireLogin: true,
          icon: "columns-gutters"
        }
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
