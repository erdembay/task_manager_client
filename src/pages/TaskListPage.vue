<template>
  <BaseLayoutComp>
    <PageTitleComp :title="title" />
    <v-row>
      <v-col> GÖREVLERRR </v-col>
    </v-row>
  </BaseLayoutComp>
</template>
<script>
import PageTitleComp from "../components/MainComponents/PageTitleComp.vue";
export default {
  components: {
    PageTitleComp,
  },
  computed: {},
  data() {
    return {
      title: "Görev Listesi",
    };
  },
};
</script>
