import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const index = () => import("../views/index");

const routes = [
  {
    path: "/",
    name: "index",
    component: index,
    children: []
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
