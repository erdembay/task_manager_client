import axios from "axios";
import { useUserStore } from "@/stores/UserStore";
import router from "@/router";
const baseURL = process.env.VUE_APP_API_BASE_URL;
const port = process.env.VUE_APP_API_PORT;
export const nodeApiAxiosTaff = axios.create({
  baseURL: `${baseURL}:${port}`,
  withCredentials: true,
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
