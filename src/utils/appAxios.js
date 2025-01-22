import axios from "axios";
import { useUserStore } from "@/stores/UserStore";
import router from "@/router";
export const nodeApiAxiosTaff = axios.create({
  baseURL: "http://localhost:3000",
});
nodeApiAxiosTaff.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        const userStore = useUserStore();
        await userStore.logout();
        router.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);
