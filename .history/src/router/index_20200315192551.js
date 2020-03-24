import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Index = () => import("../views/index");

const test = () => import("../views/test.vue");

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    children: [
      {
        path: "/test",
        name: "test",
        component: test
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
