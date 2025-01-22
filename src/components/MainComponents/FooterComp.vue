<template>
  <v-footer border elevation="15">
    <v-row justify="space-between" align="center">
      <v-col cols="auto" align-self="start">
        Copyright &copy; {{ new Date().getFullYear() }}
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
import footerLogo from "../../../public/assets/logo.png";
export default {
  data() {
    return {
      footerLogo,
    };
  },
};
</script>
<style scoped>
.ahover {
  font-weight: 500;
  color: #3c3c3c;
  text-decoration: none;
}
.ahover:hover {
  color: rgba(11, 59, 148, 0.753);
}
.v-footer {
  min-height: 6vmin !important;
}
.v-row {
  height: 100%;
}
.v-col {
  height: 100%;
}
</style>
