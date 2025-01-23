import { defineStore } from "pinia";
import { listService } from "../utils/TaskService";
export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
  }),
  getters: {
    getTasks: (state) => state.tasks,
  },
  actions: {
    async listAction(params) {
      const response = await listService(params);
      if (!response.status) {
        this.tasks = [];
      }
      this.tasks = response?.data?.data;
      return response;
    },
    resetStore() {
      this.tasks = [];
    },
  },
});
