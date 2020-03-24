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

const SurveyProject = () => import("../views/survey/SurveyProject.vue");
const SurveyView = () => import("../views/survey/SurveyView.vue");
const SurveyEditor = () => import("../views/survey/SurveyEditor.vue");
const SurveyAdd = () => import("../views/survey/SurveyAdd.vue");
const surveyViewResult = () => import("../views/survey/surveyViewResult.vue");
const SurveyViewResultAdd = () =>
  import("../views/survey/SurveyViewResultAdd.vue");
const SurveyViewResultEditor = () =>
  import("../views/survey/SurveyViewResultEditor.vue");

const TaskManage = () => import("../views/task/TaskManage.vue");
const TaskAdd = () => import("../views/task/TaskAdd.vue");
const TaskEditor = () => import("../views/task/TaskEditor.vue");
const TaskView = () => import("../views/task/TaskView.vue");

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
              requireLogin: true,
              icon: "columns-gutters"
            }
          }
        ]
      },
      {
        path: "survey",
        name: "Survey",
        redirect: "/survey/project/",
        component: {
          render(c) {
            return c("router-view");
          }
        },
        meta: {
          title: "探测管理",
          requireLogin: true,
          icon: "columns-gutters"
        },
        children: [
          {
            path: "project",
            name: "SurveyProject",
            component: SurveyProject,
            meta: {
              title: "探测项目",
              requireLogin: true,
              icon: "columns-gutters",
              containerActive: true
            },
            children: [
              {
                path: "view/:id/:name",
                name: "SurveyView",
                component: SurveyView,
                meta: {
                  title: "查看探测项目",
                  containerActive: false,
                  requireLogin: true,
                  icon: "columns-gutters"
                }
              },
              {
                path: "rusult/:id/:name",
                name: "SurveyViewMore",
                component: surveyViewResult,
                meta: {
                  title: "查看探测结果",
                  containerActive: false,
                  requireLogin: true,
                  icon: "columns-gutters"
                }
              },
              {
                path: "result/add",
                name: "SurveyViewResultAdd",
                component: SurveyViewResultAdd,
                meta: {
                  title: "新增探测结果",
                  containerActive: false,
                  requireLogin: true,
                  icon: "columns-gutters"
                }
              },
              {
                path: "result/editor/:id/:name",
                name: "SurveyViewResultEditor",
                component: SurveyViewResultEditor,
                meta: {
                  title: "修改探测结果",
                  containerActive: false,
                  requireLogin: true,
                  icon: "columns-gutters"
                }
              },
              {
                path: "editor/:id/:name",
                name: "SurveyEditor",
                component: SurveyEditor,
                meta: {
                  title: "修改探测项目",
                  containerActive: false,
                  requireLogin: true,
                  icon: "columns-gutters"
                }
              }
            ]
          },
          {
            path: "add",
            name: "SurveyAdd",
            component: SurveyAdd,
            meta: {
              title: "新增探测项目",
              requireLogin: true,
              icon: "columns-gutters"
            }
          }
        ]
      },
      {
        path: "task",
        name: "task",
        redirect: "/task/manage/",
        component: {
          render(c) {
            return c("router-view");
          }
        },
        meta: {
          title: "任务管理",
          requireLogin: true,
          icon: "columns-gutters"
        },
        children: [
          {
            path: "manage",
            name: "TaskManage",
            component: TaskManage,
            meta: {
              title: "任务列表",
              requireLogin: true,
              icon: "columns-gutters",
              containerActive: true
            },
            children: [
              {
                path: "view/:id/:name",
                name: "taskView",
                component: TaskView,
                meta: {
                  title: "查看任务详情",
                  containerActive: false,
                  requireLogin: true,
                  icon: "columns-gutters"
                }
              },
              {
                path: "editor/:id/:name",
                name: "taskEditor",
                component: TaskEditor,
                meta: {
                  title: "修改任务详情",
                  containerActive: false,
                  requireLogin: true,
                  icon: "columns-gutters"
                }
              }
            ]
          },
          {
            path: "add",
            name: "TaskAdd",
            component: TaskAdd,
            meta: {
              title: "新增任务",
              requireLogin: true,
              icon: "columns-gutters",
              containerActive: true
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
