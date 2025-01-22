import { createApp } from "vue";
import router from "./router";
// import { ApmVuePlugin } from '@elastic/apm-rum-vue'
import App from "./App.vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labsComponents from "vuetify/labs/components";
import colors from "vuetify/lib/util/colors";
import "@mdi/font/css/materialdesignicons.css";
import "sweetalert2/src/sweetalert2.scss";
import BaseLayoutComp from "@/components/MainComponents/BaseLayoutComp";
const vuetify = createVuetify({
  components: {
    ...components,
    ...labsComponents,
  },
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          greyLogin: colors.grey.lighten5,
        },
      },
    },
  },
});
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
const pinia = createPinia();
pinia.use(piniaPersist);
const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(pinia);
app.component("BaseLayoutComp", BaseLayoutComp);
app.mount("#app");
