<template>
  <div class="login-container">
    <div style="width: 100%">
      <v-row justify="center" align="center">
        <v-col lg="2" md="6" cols="6" align="center">
          <LogoComp></LogoComp>
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-col lg="3" md="10" cols="10" align-self="center">
          <v-card>
            <login-comp></login-comp>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/UserStore";
import LoginComp from "@/components/LoginPage/LoginComp";
import LogoComp from "@/components/LoginPage/LogoComp";
export default {
  components: {
    LoginComp,
    LogoComp,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    onMounted(() => {
      if (userStore.isAuthenticated) {
        router.push("/");
      }
    });
    return {};
  },
};
</script>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
