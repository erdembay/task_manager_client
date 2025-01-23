import { defineStore } from "pinia";
import { deleteService } from "../utils/AttachmentService";
export const useAttachmentStore = defineStore("attachmentStore", {
  state: () => ({}),
  getters: {},
  actions: {
    async deleteAction(id) {
      const response = await deleteService(id);
      return response;
    },
  },
});
