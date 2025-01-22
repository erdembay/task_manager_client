<template>
  <v-img width="100%" :src="imageSrc"> </v-img>
</template>
<script>
import logo from "../../../public/assets/logo.png";
export default {
  data() {
    return {
      imageSrc: logo,
    };
  },
};
</script>
