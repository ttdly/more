import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import Main from "./components/Main.vue";
import Count from "./components/Count.vue";
import User from "./components/User.vue";
import Repo from "./components/Repo.vue";

const routes = [
  { path: "/", component: Main },
  { path: "/login", component: Login },
  { path: "/count", component: Count },
  { path: "/user", component: User },
  { path: "/repo", component: Repo },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
