<template>
  <BaseLayoutComp>
    <PageTitleComp :title="title" />
    <v-row justify="center">
      <v-col cols="11" md="8">
        <v-card flat>
          <v-card-item>
            {{ getTask }}
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </BaseLayoutComp>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useTaskStore } from "@/stores/TaskStore";
import Swal from "sweetalert2";
import PageTitleComp from "../components/MainComponents/PageTitleComp.vue";
export default {
  components: {
    PageTitleComp,
  },
  setup() {
    const router = useRouter(); // Vue Router Erişim
    const taskStore = useTaskStore(); // Task Storea Erişim
    const title = ref("Görev Detayı");
    const getTask = computed(() => taskStore.getTaskInfo);
    const resAttachments = ref([]);
    const attachmentUrl = ref(
      process.env.VUE_APP_API_BASE_URL +
        ":" +
        process.env.VUE_APP_API_PORT +
        "/"
    );
    const taskId = router.currentRoute.value.query?.id;
    const getTaskInfo = async (id) => {
      const response = await taskStore.getByIdAction(id);
      if (response?.status) {
        resAttachments.value = getTask.value?.attachments;
      } else {
        Swal.fire({
          icon: "error",
          title: response?.data?.message || "Görev Bilgileri Getirilemedi!",
          width: "auto",
        });
        router.replace({ name: "TaskListPage" });
      }
    };
    onMounted(async () => {
      await getTaskInfo(taskId);
    });
    const downloadAttachment = async (url) => {
      window.open(url, "_blank");
    };
    return {
      title,
      resAttachments,
      downloadAttachment,
      attachmentUrl,
      getTask,
    };
  },
};
</script>
