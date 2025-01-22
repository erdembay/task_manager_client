import { defineStore } from "pinia";
import { loginService } from "../utils/UserService";
export const useUserStore = defineStore("userStore", {
  state: () => ({
    userInfo: null,
    auth: false,
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => state.auth,
    getUserInfo: (state) => state.userInfo,
    getToken: (state) => state.token,
  },
  actions: {
    async login(form) {
      const body = {
        username: form?.username,
        password: form?.password,
      };
      const response = await loginService(body);
      if (response?.status) {
        this.auth = true;
        this.token = response?.data?.jwt;
        delete response?.data?.jwt;
        this.userInfo = response?.data?.data;
      } else {
        this.auth = false;
        this.token = null;
        this.userInfo = null;
      }
      return response;
    },
    async logout() {
      try {
        this.userInfo = null;
        this.auth = false;
        this.token = null;
        return { message: "Çıkış Başarılı!", status: true };
      } catch (error) {
        return { message: error?.message, status: false };
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
});
