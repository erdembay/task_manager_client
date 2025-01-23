<template>
  <BaseLayoutComp>
    <PageTitleComp :title="title" />
    <v-row justify="center">
      <v-col cols="11" md="10">
        <v-card elevation="2">
          <VRow>
            <VCol cols="12" md="6">
              <v-card-title>
                <v-icon>mdi-information</v-icon> Görev Bilgileri
              </v-card-title>
              <VCardItem>
                <VTable striped hover fixed-header>
                  <tbody>
                    <tr>
                      <th class="font-weight-bold">
                        <v-icon icon="mdi-format-title" class="mr-2"></v-icon>
                        Başlık
                      </th>
                      <td class="text-left">{{ getTask.title }}</td>
                    </tr>
                    <tr>
                      <th class="font-weight-bold">
                        <v-icon
                          icon="mdi-format-align-left"
                          class="mr-2"
                        ></v-icon>
                        Açıklama
                      </th>
                      <td class="text-left">{{ getTask.description }}</td>
                    </tr>
                    <tr>
                      <th class="font-weight-bold">
                        <v-icon icon="mdi-format-title" class="mr-2"></v-icon>
                        Öncelik
                      </th>
                      <td class="text-left">
                        <v-chip
                          :color="
                            getTask.priorityId == 3
                              ? 'error'
                              : getTask.priorityId == 2
                              ? 'warning'
                              : 'success'
                          "
                        >
                          {{
                            getTask.priorityId == 3
                              ? "Yüksek"
                              : getTask.priorityId == 2
                              ? "Orta"
                              : "Düşük"
                          }}
                        </v-chip>
                      </td>
                    </tr>
                    <tr>
                      <th class="font-weight-bold">
                        <v-icon icon="mdi-calendar" class="mr-2"></v-icon>
                        Bitiş Tarihi
                      </th>
                      <td class="text-left">{{ date(getTask.endDate) }}</td>
                    </tr>
                    <tr>
                      <th class="font-weight-bold">
                        <v-icon icon="mdi-account" class="mr-2"></v-icon>
                        Atanan Kişi
                      </th>
                      <td class="text-left">{{ getTask.user?.username }}</td>
                    </tr>
                    <tr>
                      <th class="font-weight-bold">
                        <v-icon icon="mdi-check" class="mr-2"></v-icon>
                        Durum
                      </th>
                      <td class="text-left">
                        <v-chip
                          :color="getTask.status == 1 ? 'success' : 'error'"
                          class="text-white"
                        >
                          {{
                            getTask.status == 1 ? "Tamamlandı" : "Tamamlanmadı"
                          }}
                        </v-chip>
                      </td>
                    </tr>
                  </tbody>
                </VTable>
              </VCardItem>
            </VCol>
            <VCol cols="12" md="6">
              <v-card-title>
                <v-icon>mdi-file</v-icon> Ek Dosyalar
              </v-card-title>
              <VCardItem>
                <v-list>
                  <v-list-item
                    v-for="(attachment, index) in resAttachments"
                    :key="index"
                  >
                    <v-list-item-title
                      v-if="attachment.type.split('/')[0] == 'application'"
                    >
                      {{ attachment.filename }}
                      <v-btn
                        size="xsmall"
                        color="success"
                        variant="flat"
                        class="pa-1 mx-2"
                        @click="
                          downloadAttachment(attachmentUrl + attachment.url)
                        "
                      >
                        <VIcon>mdi-download</VIcon>
                      </v-btn>
                    </v-list-item-title>
                    <v-list-item-title
                      v-else-if="attachment.type.split('/')[0] == 'image'"
                    >
                      <v-img
                        :src="attachmentUrl + attachment.url"
                        width="100%"
                        height="200px"
                        class="mx-2"
                      ></v-img>
                    </v-list-item-title>
                    <v-list-item-title
                      v-else-if="attachment.type.split('/')[0] == 'video'"
                    >
                      <video width="100%" height="200px" controls class="mx-2">
                        <source :src="attachmentUrl + attachment.url" />
                      </video>
                    </v-list-item-title>
                    <VDivider class="my-3"></VDivider>
                  </v-list-item>
                </v-list>
              </VCardItem>
            </VCol>
          </VRow>
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
import Helpers from "@/utils/helpers";
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
    const date = (date) => {
      return Helpers.date(date);
    };
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
      date,
    };
  },
};
</script>
