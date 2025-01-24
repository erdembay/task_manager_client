<template>
  <v-img width="100%" :src="imageSrc"> </v-img>
</template>
<script>
import { ref } from "vue";
import logo from "../../../public/assets/logo.png";
export default {
  setup() {
    const imageSrc = ref(logo);
    return {
      imageSrc,
    };
  },
};
</script>
