import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/UserStore";
const routes = [
  {
    name: "HomePage",
    path: "/",
    component: () => import("@/pages/HomePage"),
  },
  {
    name: "TaskListPage",
    path: "/tasks",
    component: () => import("@/pages/TaskListPage"),
  },
  {
    name: "LoginPage",
    path: "/login",
    component: () => import("@/pages/LoginPage"),
  },
  {
    name: "ErrorPage",
    path: "/forbidden",
    component: () => import("@/pages/ErrorPage.vue"),
  },
  {
    name: "404Page",
    path: "/:catchAll(.*)", // Herhangi bir yol ile eşleşecek
    component: () => import("@/pages/404Page"), // 404 sayfası
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to) => {
  const userStore = useUserStore();
  const _isAuth = userStore.isAuthenticated;
  if (!_isAuth && to.fullPath != "/login") {
    return "login";
  } else {
    if (to.name === "ErrorPage") return;
    if (to.name === "LoginPage") return;
    else if (to.name === "404Page") return;
  }
});
export default router;
