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
              <v-btn
                @click="taskAddMethod"
                color="primary"
                size="small"
                :loading="loading"
                :disabled="loading"
                style="text-transform: none"
                block
              >
                <VIcon class="mr-2">mdi-plus</VIcon>
                Görev Ekle
              </v-btn>
            </v-form>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </BaseLayoutComp>
</template>
<script>
import { ref } from "vue";
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
    const form = ref(null); // Form Ref
    const loading = ref(false);
    const title = ref("Görev Ekle");
    const inputTitle = ref(null);
    const inputDescription = ref(null);
    const inputPriorityId = ref(1);
    const inputEndDate = ref(null);
    const attachments = ref(null);
    const titleRules = [(v) => !!v || "Başlık boş bırakılamaz"];
    const descriptionRules = [(v) => !!v || "Açıklama boş bırakılamaz"];
    const priorityIdRules = [(v) => !!v || "Öncelik boş bırakılamaz"];
    const endDateRules = [(v) => !!v || "Bitiş tarihi boş bırakılamaz"];
    const taskAddMethod = async () => {
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
        if (attachments.value) {
          attachments.value.map((item) => {
            formData.append("attachment", item);
          });
        }
        const responseAdd = await taskStore.createAction(formData);
        if (responseAdd?.status) {
          Swal.fire({
            icon: "success",
            title: responseAdd?.data?.message || "Görev Başarıyla Eklendi!",
            width: "auto",
          });
          router.replace({ name: "TaskListPage" });
        } else {
          Swal.fire({
            icon: "error",
            title:
              responseAdd?.data?.message || "Görev Eklenirken Hata Oluştu!",
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
      attachments,
      titleRules,
      descriptionRules,
      priorityIdRules,
      endDateRules,
      taskAddMethod,
      title,
    };
  },
};
</script>
