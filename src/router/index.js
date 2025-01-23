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
    name: "TaskAddPage",
    path: "/task_add",
    component: () => import("@/pages/TaskAddPage"),
  },
  {
    name: "TaskEditPage",
    path: "/task_edit",
    component: () => import("@/pages/TaskEditPage"),
  },
  {
    name: "LoginPage",
    path: "/login",
    component: () => import("@/pages/LoginPage"),
  },
  {
    name: "RegisterPage",
    path: "/register",
    component: () => import("@/pages/RegisterPage"),
  },
  {
    name: "ErrorPage",
    path: "/forbidden",
    component: () => import("@/pages/ErrorPage"),
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
  if (!_isAuth && to.fullPath != "/login" && to.fullPath != "/register") {
    return "login";
  } else {
    if (_isAuth && to.fullPath == "/login") return "/";
    if (_isAuth && to.fullPath == "/register") return "/";
  }
});
export default router;
