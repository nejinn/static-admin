import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Index = () => import("../views/index");

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    children: []
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
