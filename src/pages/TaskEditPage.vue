<template>
  <BaseLayoutComp>
    <PageTitleComp :title="title" />
    <v-row justify="center">
      <v-col cols="11" md="6">
        <v-card flat>
          <v-card-item>
            <v-form ref="form" class="pa-4">
              <v-text-field
                v-model="inputTitle"
                label="Başlık *"
                placeholder="Başlık"
                prepend-icon="mdi-format-title"
                variant="outlined"
                dense
                :rules="titleRules"
                required
                class="mb-2"
              ></v-text-field>
              <v-textarea
                v-model="inputDescription"
                label="Açıklama *"
                placeholder="Açıklama"
                prepend-icon="mdi-format-align-left"
                variant="outlined"
                :rules="descriptionRules"
                dense
                required
                class="mb-2"
              ></v-textarea>
              <v-select
                prepend-icon="mdi-format-title"
                v-model="inputPriorityId"
                :items="[
                  { text: 'Düşük', value: 1 },
                  { text: 'Orta', value: 2 },
                  { text: 'Yüksek', value: 3 },
                ]"
                label="Öncelik *"
                variant="outlined"
                item-title="text"
                :rules="priorityIdRules"
                item-value="value"
                dense
                required
                class="mb-2"
              ></v-select>
              <VTextField
                v-model="inputEndDate"
                label="Bitiş Tarihi *"
                type="date"
                variant="outlined"
                :rules="endDateRules"
                dense
                required
                prepend-icon="mdi-calendar"
                class="mb-2"
              ></VTextField>
              <v-switch
                prepend-icon="mdi-check"
                v-model="inputStatus"
                :label="inputStatus ? 'Tamamlandı' : 'Tamamlanmadı'"
                color="success"
                class="mb-2"
              ></v-switch>
              <v-file-input
                v-model="attachments"
                :show-size="1000"
                color="amber-darken-2"
                label="Ek dosya seçiniz (Opsiyonel)"
                placeholder="Dosya seçiniz"
                prepend-icon="mdi-paperclip"
                variant="outlined"
                counter
                multiple
              >
                <template v-slot:selection="{ fileNames }">
                  <template
                    v-for="(fileName, index) in fileNames"
                    :key="fileName"
                  >
                    <v-chip
                      v-if="index < 2"
                      class="me-2"
                      color="info"
                      size="small"
                      label
                    >
                      {{ fileName }}
                    </v-chip>
                    <span
                      v-else-if="index === 2"
                      class="text-overline text-grey-darken-3 mx-2"
                    >
                      +{{ attachments.length - 2 }} Dosyalar
                    </span>
                  </template>
                </template>
              </v-file-input>
              <v-divider class="my-4"></v-divider>
              <v-row>
                <v-col
                  v-for="(item, index) in resAttachments"
                  :key="index"
                  cols="3"
                >
                  <div v-if="item?.type.split('/')[0] == 'application'">
                    <!-- indirilebilir olması lazım -->
                    {{ item?.filename }}
                    <v-btn
                      @click="downloadAttachment(attachmentUrl + item?.url)"
                      color="primary"
                      size="x-small"
                      class="pa-1 ma-2"
                    >
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                  </div>
                  <div v-else-if="item?.type.split('/')[0] == 'image'">
                    <v-img
                      :src="attachmentUrl + item?.url"
                      :alt="item?.filename"
                      style="width: 100%; height: 100px"
                    />
                  </div>
                  <div v-else-if="item?.type.split('/')[0] == 'video'">
                    <video
                      controls
                      style="width: 100%; height: 100px"
                      :src="attachmentUrl + item?.url"
                    ></video>
                  </div>
                  <!-- silme butonu -->
                  <v-btn
                    @click="attachmentDelete(item.id)"
                    color="error"
                    size="x-small"
                    class="pa-1 ma-2"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-divider class="my-4"></v-divider>
              <v-btn
                @click="taskEditMethod"
                color="primary"
                size="small"
                :loading="loading"
                :disabled="loading"
                style="text-transform: none"
                block
              >
                <VIcon class="mr-2">mdi-pencil</VIcon>
                Görev Düzenle
              </v-btn>
            </v-form>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </BaseLayoutComp>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTaskStore } from "@/stores/TaskStore";
import { useAttachmentStore } from "@/stores/AttachmentStore";
import Swal from "sweetalert2";
import PageTitleComp from "../components/MainComponents/PageTitleComp.vue";
export default {
  components: {
    PageTitleComp,
  },
  setup() {
    const router = useRouter(); // Vue Router Erişim
    const taskStore = useTaskStore(); // Task Storea Erişim
    const attachmentStore = useAttachmentStore(); // Attachment Storea Erişim
    const form = ref(null); // Form Ref
    const loading = ref(false);
    const title = ref("Görev Düzenle");
    const inputTitle = ref(null);
    const inputDescription = ref(null);
    const inputPriorityId = ref(1);
    const inputEndDate = ref(null);
    const inputStatus = ref(0);
    const resAttachments = ref([]);
    const attachments = ref(null);
    const attachmentUrl = ref(
      process.env.VUE_APP_API_BASE_URL +
        ":" +
        process.env.VUE_APP_API_PORT +
        "/"
    );
    const titleRules = [(v) => !!v || "Başlık boş bırakılamaz"];
    const descriptionRules = [(v) => !!v || "Açıklama boş bırakılamaz"];
    const priorityIdRules = [(v) => !!v || "Öncelik boş bırakılamaz"];
    const endDateRules = [(v) => !!v || "Bitiş tarihi boş bırakılamaz"];
    const taskId = router.currentRoute.value.query?.id;
    const getTaskInfo = async (id) => {
      const response = await taskStore.getByIdAction(id);
      if (response?.status) {
        const resData = taskStore.getTaskInfo;
        inputTitle.value = resData?.title;
        inputDescription.value = resData?.description;
        inputPriorityId.value = resData?.priorityId;
        inputEndDate.value = new Date(resData?.endDate)
          .toISOString()
          .substr(0, 10);
        inputStatus.value = resData?.status;
        resAttachments.value = resData?.attachments;
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
    const attachmentDelete = async (id) => {
      const response = await attachmentStore.deleteAction(id);
      if (response?.status) {
        Swal.fire({
          icon: "success",
          title: response?.data?.message || "Dosya Başarıyla Silindi!",
          width: "auto",
        });
        await getTaskInfo(taskId);
      } else {
        Swal.fire({
          icon: "error",
          title: response?.data?.message || "Dosya Silinirken Hata Oluştu!",
          width: "auto",
        });
      }
    };
    const downloadAttachment = async (url) => {
      window.open(url, "_blank");
    };
    const taskEditMethod = async () => {
      loading.value = true;
      const valid = await form.value.validate();
      if (!valid.valid) {
        loading.value = false;
        return;
      } else {
        const formData = new FormData();
        formData.append("title", inputTitle.value);
        formData.append("description", inputDescription.value);
        formData.append("priorityId", inputPriorityId.value);
        formData.append("endDate", inputEndDate.value);
        formData.append("status", inputStatus.value);
        if (attachments.value) {
          attachments.value.map((item) => {
            formData.append("attachment", item);
          });
        }
        const responseAdd = await taskStore.updateAction(taskId, formData);
        if (responseAdd?.status) {
          Swal.fire({
            icon: "success",
            title: responseAdd?.data?.message || "Görev Başarıyla Düzenlendi!",
            width: "auto",
          });
          router.replace({ name: "TaskListPage" });
        } else {
          Swal.fire({
            icon: "error",
            title: responseAdd?.message || "Görev Düzenlenirken Hata Oluştu!",
            width: "auto",
          });
        }
        loading.value = false;
      }
    };
    return {
      form,
      loading,
      inputTitle,
      inputDescription,
      inputPriorityId,
      inputEndDate,
      inputStatus,
      attachments,
      titleRules,
      descriptionRules,
      priorityIdRules,
      endDateRules,
      taskEditMethod,
      title,
      resAttachments,
      attachmentDelete,
      downloadAttachment,
      attachmentUrl,
    };
  },
};
</script>
