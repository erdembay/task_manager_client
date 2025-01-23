<template>
  <BaseLayoutComp>
    <PageTitleComp :title="title" />
    <v-row>
      <v-col>
        <v-card flat>
          <template #text>
            <VRow justify="end">
              <VCol cols="12" md="3" lg="2">
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
                {{ time(item.endDate) }}
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
            </v-data-table-server>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </BaseLayoutComp>
</template>
<script>
import PageTitleComp from "../components/MainComponents/PageTitleComp.vue";
import { mapState, mapActions } from "pinia";
import { useTaskStore } from "@/stores/TaskStore";
import Helpers from "@/utils/helpers";
import Swal from "sweetalert2";
export default {
  components: {
    PageTitleComp,
  },
  computed: {
    ...mapState(useTaskStore, ["getTasks"]),
  },
  methods: {
    ...mapActions(useTaskStore, ["listAction", "resetStore"]),
    date(time) {
      return Helpers.date(time);
    },
    time(time) {
      return Helpers.time(time);
    },
    async loadItems({ page, itemsPerPage, sortBy }) {
      itemsPerPage === -1 ? (itemsPerPage = this.totalItems) : itemsPerPage;
      this.loading = true;
      if (sortBy.length > 0) {
        if (sortBy[0]?.key === "priority.name") sortBy[0].key = "priorityId";
      }
      const params = {
        page,
        limit: itemsPerPage,
        orderBy: sortBy[0]?.key,
        sortOrder: sortBy[0]?.order,
      };
      if (this.priorityId !== 0) params.priority = this.priorityId;
      if (this.status !== 2) params.status = this.status;
      if (this.endDate) params.endDate = this.endDate;
      await this.listAction(params).then((response) => {
        if (!response?.status)
          Swal.fire(
            "Listelemede hata oluşmuştur!",
            "Sayfayı Yenileyiniz...",
            "error"
          );
        this.serverItems = this.getTasks?.data;
        this.totalItems = this.getTasks?.totalItems;
        this.loading = false;
        if (sortBy.length > 0) {
          if (sortBy[0]?.key === "priorityId") sortBy[0].key = "priority.name";
        }
      });
    },
  },
  async created() {
    await this.listAction();
  },
  beforeUnmount() {
    this.resetStore;
  },
  data() {
    return {
      title: "Görev Listesi",
      headers: [
        {
          key: "id",
          title: "ID",
        },
        {
          key: "title",
          title: "Başlık",
        },
        {
          key: "description",
          title: "Açıklama",
        },
        {
          key: "status",
          title: "Durum",
        },
        {
          key: "priority.name",
          title: "Öncelik",
        },
        {
          key: "user.username",
          title: "Kullanıcı",
          sortable: false,
        },
        {
          key: "endDate",
          title: "DeadLine",
        },
        {
          key: "updatedAt",
          title: "Son Güncelleme Tarihi",
        },
      ],
      itemsPerPage: 10,
      serverItems: [],
      sortBy: [],
      loading: true,
      totalItems: 0,
      priorityId: 0,
      status: 2,
      endDate: null,
    };
  },
};
</script>
