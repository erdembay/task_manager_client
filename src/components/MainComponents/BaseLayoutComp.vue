<template>
  <sidebar-comp
    :user="user"
    :title="routeName"
    :menuItems="menuItems.menuItems"
  ></sidebar-comp>
  <v-main>
    <v-container fluid>
      <slot />
    </v-container>
    <footer-comp></footer-comp>
  </v-main>
</template>
<script>
import { mapState } from "pinia";
import { useUserStore } from "../../stores/UserStore";
import SidebarComp from "./SidebarComp.vue";
import FooterComp from "./FooterComp.vue";
export default {
  components: {
    SidebarComp,
    FooterComp,
  },
  computed: {
    ...mapState(useUserStore, ["getUserInfo"]),
  },
  async created() {
    this.menuItems.menuItems = [
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
    this.user.fullName = this.getUserInfo?.username;
  },
  methods: {},
  data() {
    return {
      routeName: this.$route.name,
      user: {
        username: null,
      },
      menuItems: {
        menuItems: [],
      },
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
