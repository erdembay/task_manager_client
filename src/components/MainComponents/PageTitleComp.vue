<template>
  <v-row class="pa-2">
    <v-col cols="12">
      <div style="color: #02316e" class="text-h5">
        {{ title }}
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>
