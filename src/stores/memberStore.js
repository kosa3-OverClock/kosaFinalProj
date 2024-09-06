import axiosInstance from "@/api/axiosInstance";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("accessToken", {
  state: () => ({
    accessToken: "",
    user: null,
  }),

  actions: {
    login(payload) {
      this.accessToken = payload.accessToken;
    },

    async fetchUser() {
      try {
        // 토큰을 이용하여 유저 정보 요청
        const response = await axiosInstance.get("/api/members");
        this.user = response.data;
      } catch (err) {
        console.error("유저 정보 가져오기 실패: ", err);
        this.logout();
      }
    },
    logout() {
      this.accessToken = "";
      this.user = null;
      localStorage.removeItem("selectedPage");
    },
  },

  getters: {
    getAccessToken: (state) => state.accessToken,
    getUser: (state) => state.user,
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "auth", // 로컬 스토리지에 저장될 기본 키 이름
        storage: localStorage,
        paths: ["accessToken", "user"], // 두 가지 상태 모두 저장
      }
    ],
  },
});
