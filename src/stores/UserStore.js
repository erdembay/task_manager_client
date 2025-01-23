import { defineStore } from "pinia";
import { loginService, registerService } from "../utils/UserService";
import Cookies from "js-cookie";
export const useUserStore = defineStore("userStore", {
  state: () => ({
    userInfo: Cookies.get("userInfo") || null,
    auth: Cookies.get("auth") || false,
    token: Cookies.get("jwtToken") || null,
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
        Cookies.set("auth", true, {
          expires: 3,
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("jwtToken", response?.data?.jwt, {
          expires: 3,
          secure: true,
          sameSite: "Strict",
        });
        delete response?.data?.jwt;
        Cookies.set("userInfo", response?.data?.data, {
          expires: 3,
          secure: true,
          sameSite: "Strict",
        });
      } else {
        this.auth = false;
        Cookies.remove("auth");
        this.token = null;
        Cookies.remove("jwtToken");
        this.userInfo = null;
        Cookies.remove("userInfo");
      }
      return response;
    },
    async register(form) {
      const body = {
        username: form?.username,
        password: form?.password,
        passwordRepeat: form?.passwordRepeat,
        email: form?.email,
      };
      const response = await registerService(body);
      return response;
    },
    async logout() {
      try {
        this.userInfo = null;
        Cookies.remove("userInfo");
        this.auth = false;
        Cookies.remove("auth");
        this.token = null;
        Cookies.remove("jwtToken");
        return { message: "Çıkış Başarılı!", status: true };
      } catch (error) {
        return { message: error?.message, status: false };
      }
    },
  },
});
