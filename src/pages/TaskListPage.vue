<template>
  <BaseLayoutComp>
    <PageTitleComp :title="title" />
    <v-row>
      <v-col>
        <v-card flat>
          <template #text>
            <VRow justify="end">
              <VCol cols="12" md="3" lg="2">
                <!-- TODO: priority list servis yazıldığında dinamik olarak listelenebilir şimdilik statik -->
                <VSelect
                  v-model="priorityId"
                  :items="[
                    { text: 'Tümü', value: 0 },
                    { text: 'Düşük', value: 1 },
                    { text: 'Orta', value: 2 },
                    { text: 'Yüksek', value: 3 },
                  ]"
                  label="Öncelik Durumu"
                  variant="outlined"
                  item-title="text"
                  item-value="value"
                  dense
                >
                </VSelect>
              </VCol>
              <VCol cols="12" md="3" lg="2">
                <!-- ? Status durumu db de boolean olarak verildiği için bu şekilde çalışabilir -->
                <VSelect
                  v-model="status"
                  :items="[
                    { text: 'Tümü', value: 2 },
                    { text: 'Tamamlandı', value: 1 },
                    { text: 'Tamamlanmadı', value: 0 },
                  ]"
                  label="Durum"
                  variant="outlined"
                  item-title="text"
                  item-value="value"
                  dense
                >
                </VSelect>
              </VCol>
              <!-- Tarih Seçimi - modal input-->
              <VCol cols="12" md="3" lg="2">
                <VTextField
                  v-model="endDate"
                  label="Tarih"
                  type="date"
                  variant="outlined"
                  dense
                ></VTextField>
              </VCol>
              <VCol cols="12" md="3" lg="1">
                <VRow justify="end" style="text-align: end">
                  <VCol cols="12">
                    <VBtn @click="filterMethod" color="primary" dark>
                      Sorgula
                    </VBtn>
                  </VCol>
                  <VCol cols="12">
                    <VBtn @click="resetFilter" color="error" dark>
                      Sıfırla
                    </VBtn>
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
          </template>
          <v-card-item>
            <v-data-table-server
              v-model:items-per-page="itemsPerPage"
              :headers="headers"
              :items-length="totalItems"
              :items="serverItems"
              :loading="loading"
              loading-text="Yükleniyor... Lütfen Bekleyiniz."
              item-value="name"
              @update:options="loadItems"
            >
              <template v-slot:no-data>
                <v-alert :value="true" color="error" icon="mdi-alert">
                  Kayıt Bulunamadı!
                </v-alert>
              </template>
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template #item.endDate="{ item }">
                {{ date(item.endDate) }}
              </template>
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template #item.updatedAt="{ item }">
                {{ time(item.updatedAt) }}
              </template>
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template #item.status="{ item }">
                <v-chip :color="item.status == 1 ? 'success' : 'error'" dark>{{
                  item.status == 1 ? "Tamamlandı" : "Tamamlanmadı"
                }}</v-chip>
              </template>
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template #item.priority.name="{ item }">
                <v-chip
                  :color="
                    item.priority.name === 'low'
                      ? 'success'
                      : item.priority.name === 'medium'
                      ? 'warning'
                      : 'error'
                  "
                  dark
                  >{{
                    item.priority.name === "low"
                      ? "Düşük"
                      : item.priority.name === "medium"
                      ? "Orta"
                      : "Yüksek"
                  }}</v-chip
                >
              </template>
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template #item.user.username="{ item }">
                {{ item.user.username }}
              </template>
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template #item.actions="{ item }">
                <VBtn
                  :to="'/task_detail?id=' + item?.id"
                  color="info"
                  size="xsmall"
                  variant="flat"
                  class="pa-1 mr-2"
                  style="text-transform: unset"
                >
                  <VIcon>mdi-eye</VIcon>
                </VBtn>
                <VBtn
                  :to="'/task_edit?id=' + item?.id"
                  color="primary"
                  size="xsmall"
                  variant="flat"
                  class="pa-1 mr-2"
                  style="text-transform: unset"
                >
                  <VIcon>mdi-pencil</VIcon>
                </VBtn>
                <VBtn
                  @click="deleteItem(item.id)"
                  color="error"
                  size="xsmall"
                  variant="flat"
                  class="pa-1"
                  style="text-transform: unset"
                >
                  <VIcon>mdi-delete</VIcon>
                </VBtn>
              </template>
            </v-data-table-server>
          </v-card-item>
          <VCardActions>
            <VRow justify="end">
              <VCol cols="12">
                <VBtn
                  href="/task_add"
                  color="success"
                  size="small"
                  block
                  variant="flat"
                  style="text-transform: unset"
                >
                  <VIcon class="mr-2">mdi-plus</VIcon>
                  Görev Ekle</VBtn
                >
              </VCol>
            </VRow>
          </VCardActions>
        </v-card>
      </v-col>
    </v-row>
  </BaseLayoutComp>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import { useTaskStore } from "@/stores/TaskStore";
import Helpers from "@/utils/helpers";
import Swal from "sweetalert2";
import PageTitleComp from "../components/MainComponents/PageTitleComp.vue";
export default {
  components: {
    PageTitleComp,
  },
  setup() {
    const taskStore = useTaskStore();
    const title = ref("Görev Listesi");
    const headers = ref([
      { key: "id", title: "ID" },
      { key: "title", title: "Başlık" },
      { key: "description", title: "Açıklama" },
      { key: "status", title: "Durum" },
      { key: "priority.name", title: "Öncelik" },
      { key: "user.username", title: "Kullanıcı", sortable: false },
      { key: "endDate", title: "DeadLine" },
      { key: "updatedAt", title: "Son Güncelleme Tarihi" },
      { key: "actions", title: "İşlemler", sortable: false },
    ]);
    const itemsPerPage = ref(10);
    const serverItems = ref([]);
    const sortBy = ref([]);
    const loading = ref(true);
    const totalItems = ref(0);
    const priorityId = ref(0);
    const status = ref(2);
    const endDate = ref(null);
    const getTasks = computed(() => taskStore.getTasks);
    const date = (time) => Helpers.date(time);
    const time = (time) => Helpers.time(time);
    const deleteItem = async (id) => {
      const response = await taskStore.deleteAction(id);
      if (response?.status) {
        Swal.fire("Başarılı!", "Silme işlemi başarılı!", "success");
        await loadItems({
          page: 1,
          itemsPerPage: itemsPerPage.value,
          sortBy: sortBy.value,
        });
      } else {
        Swal.fire("Hata!", "Silme işlemi başarısız!", "error");
      }
    };
    const filterMethod = () => {
      loadItems({
        page: 1,
        itemsPerPage: itemsPerPage.value,
        sortBy: sortBy.value,
      });
    };
    const resetFilter = () => {
      priorityId.value = 0;
      status.value = 2;
      endDate.value = null;
      loadItems({
        page: 1,
        itemsPerPage: itemsPerPage.value,
        sortBy: sortBy.value,
      });
    };
    const loadItems = async ({ page, itemsPerPage, sortBy }) => {
      itemsPerPage === -1 ? (itemsPerPage = totalItems.value) : itemsPerPage;
      loading.value = true;
      if (sortBy.length > 0) {
        if (sortBy[0]?.key === "priority.name") sortBy[0].key = "priorityId";
      }
      const params = {
        page,
        limit: itemsPerPage,
        orderBy: sortBy[0]?.key,
        sortOrder: sortBy[0]?.order,
      };
      if (priorityId.value !== 0) params.priority = priorityId.value;
      if (status.value !== 2) params.status = status.value;
      if (endDate.value) params.endDate = endDate.value;
      const response = await taskStore.listAction(params);
      if (!response?.status) {
        Swal.fire(
          "Listelemede hata oluşmuştur!",
          "Sayfayı Yenileyiniz...",
          "error"
        );
      }
      serverItems.value = getTasks.value?.data;
      totalItems.value = getTasks.value?.totalItems;
      loading.value = false;
      if (sortBy.length > 0) {
        if (sortBy[0]?.key === "priorityId") sortBy[0].key = "priority.name";
      }
    };
    onMounted(async () => {
      await loadItems({
        page: 1,
        itemsPerPage: itemsPerPage.value,
        sortBy: sortBy.value,
      });
    });
    return {
      title,
      headers,
      itemsPerPage,
      serverItems,
      sortBy,
      loading,
      totalItems,
      priorityId,
      status,
      endDate,
      date,
      time,
      filterMethod,
      resetFilter,
      loadItems,
      deleteItem,
    };
  },
};
</script>
