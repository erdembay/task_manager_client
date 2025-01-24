<template>
  <sidebar-comp
    :user="user"
    :title="routeName"
    :menuItems="menuItems"
  ></sidebar-comp>
  <v-main>
    <v-container fluid>
      <slot />
    </v-container>
    <footer-comp></footer-comp>
  </v-main>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../../stores/UserStore";
import SidebarComp from "./SidebarComp.vue";
import FooterComp from "./FooterComp.vue";
export default {
  components: {
    SidebarComp,
    FooterComp,
  },
  setup() {
    const route = useRoute();
    const userStore = useUserStore();
    const routeName = ref(route.name);
    const user = ref({
      username: null,
    });
    const menuItems = ref([]);
    const getUserInfo = computed(() => userStore.getUserInfo);
    onMounted(() => {
      menuItems.value = [
        {
          title: "Görevler",
          icon: "mdi-cog",
          route: "/",
          child: [
            {
              title: "Görevleri Listele",
              icon: "mdi-cog",
              route: "/tasks",
            },
          ],
        },
      ];
      user.value.username = getUserInfo.value?.username;
    });
    return {
      routeName,
      user,
      menuItems,
    };
  },
};
</script>
<style>
body {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
}
.v-main {
  background-color: #e9ecef;
  min-height: 87vh !important;
}
.v-container {
  min-height: 87vh;
}
</style>
