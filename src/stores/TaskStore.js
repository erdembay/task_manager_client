import { defineStore } from "pinia";
import {
  listService,
  createService,
  updateService,
  getByIdService,
  deleteService,
} from "../utils/TaskService";
export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    taskInfo: {},
  }),
  getters: {
    getTasks: (state) => state.tasks,
    getTaskInfo: (state) => state.taskInfo,
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
    async createAction(body) {
      const response = await createService(body);
      return response;
    },
    async updateAction(id, body) {
      const response = await updateService(id, body);
      return response;
    },
    async getByIdAction(id) {
      const response = await getByIdService(id);
      if (response?.status) {
        this.taskInfo = response?.data?.data;
      } else {
        this.taskInfo = {};
      }
      return response;
    },
    async deleteAction(id) {
      const response = await deleteService(id);
      return response;
    },
    resetStore() {
      this.tasks = [];
    },
  },
});
