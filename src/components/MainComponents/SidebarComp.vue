<template>
  <v-navigation-drawer v-model="drawer">
    <v-list density="compact">
      <v-list-item style="color: #f68c02" class="pa-4" href="/">
        <v-img height="5vmin" :src="logoSrc"></v-img>
      </v-list-item>
      <v-divider class="my-2"></v-divider>
      <div v-for="(item, index) in menuItems" :key="index">
        <v-list-item v-if="!item?.child" :href="item?.route">
          <template v-slot:prepend>
            <v-icon :icon="item?.icon"></v-icon>
          </template>
          <v-list-item-title
            style="
              word-wrap: break-word !important;
              white-space: unset !important;
            "
            >{{ item?.title }}</v-list-item-title
          >
        </v-list-item>
        <v-list-group v-if="item?.child" :value="item?.title">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <template v-slot:prepend>
                <v-icon :icon="item?.icon"></v-icon>
              </template>
              <v-list-item-title
                style="
                  word-wrap: break-word !important;
                  white-space: unset !important;
                "
                >{{ item?.title }}</v-list-item-title
              >
            </v-list-item>
          </template>
          <v-list-item
            v-for="(child, index) in item?.child"
            :key="index"
            :href="child?.route"
          >
            <template v-slot:prepend>
              <v-icon :icon="child?.icon"></v-icon>
            </template>
            <v-list-item-title
              style="
                word-wrap: break-word !important;
                white-space: unset !important;
              "
              >{{ child?.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list-group>
      </div>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar :elevation="15" rounded app>
    <v-app-bar-nav-icon @click.stop="drawClick"></v-app-bar-nav-icon>
    <div
      class="ml-auto"
      style="
        width: auto;
        text-align: right;
        color: #3c3c3c;
        font-size: 16px;
        font-weight: 400;
      "
    >
      Görev Yönetim Sistemi
    </div>
    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props: menu }">
          <v-tooltip location="bottom">
            <template v-slot:activator="{ props: tooltip }">
              <v-list class="pointer" v-bind="mergeProps(menu, tooltip)">
                <v-list-item lines="two" class="py-4">
                  <template v-slot:append>
                    <v-icon icon="mdi-account-circle"></v-icon>
                  </template>
                  <v-list-item-title>{{ user?.fullName }}</v-list-item-title>
                  <v-list-item-title
                    style="font-weight: 600; text-align: end; color: #2096f3"
                    >{{ user?.roleName }}</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </template>
            <span>Kullanıcı İşlemleri İçin Tıklayınız.</span>
          </v-tooltip>
        </template>
        <v-list class="pa-0">
          <v-list-item class="logout" @click="logOutFunc">
            <template v-slot:prepend>
              <v-icon icon="mdi-logout"></v-icon>
            </template>
            <v-list-item-title>Çıkış Yap</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>
<script>
import { mergeProps } from "vue";
import logoSideBar from "../../../public/assets/logo.png";
import { mapActions } from "pinia";
import { useUserStore } from "../../stores/UserStore";
export default {
  props: ["menuItems", "title", "user"],
  data() {
    return {
      drawer: true,
      rail: false,
      logoSrc: logoSideBar,
    };
  },
  methods: {
    ...mapActions(useUserStore, ["logout"]),
    navigate(route) {
      this.$router.replace(route);
    },
    drawClick() {
      this.drawer = !this.drawer;
    },
    mergeProps,
    async logOutFunc() {
      const response = await this.logout();
      if (response.status) {
        this.navigate("/login");
      }
    },
  },
};
</script>
<style scoped>
.v-navigation-drawer {
  color: #f0f0f0;
  background-color: #3c3c3c;
}
.v-list-group__items .v-list-item {
  -webkit-padding-start: calc(10%) !important;
  padding-inline-start: calc(10%) !important;
}
.v-app-bar {
  min-height: 7vh !important;
}
.logout:hover {
  background-color: #3c3c3c;
  color: #f0f0f0;
}
.pointer {
  cursor: pointer;
}
</style>
