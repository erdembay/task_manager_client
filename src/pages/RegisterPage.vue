<template>
  <div class="login-container">
    <div style="width: 100%">
      <v-row justify="center" align="center">
        <v-col lg="2" md="6" cols="6" align="center">
          <LogoComp></LogoComp>
        </v-col>
        <v-col lg="3" md="10" cols="10" align-self="center">
          <v-card>
            <RegisterComp></RegisterComp>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import RegisterComp from "@/components/RegisterPage/RegisterComp";
import LogoComp from "@/components/LoginPage/LogoComp";
import { mapState } from "pinia";
import { useUserStore } from "../stores/UserStore";
export default {
  components: {
    RegisterComp,
    LogoComp,
  },
  data() {
    return {};
  },
  methods: {
    ...mapState(useUserStore, ["isAuthenticated"]),
  },
  created() {},
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
