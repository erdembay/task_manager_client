<template>
  <v-sheet class="mx-auto">
    <v-form
      ref="form"
      validate-on="submit lazy"
      @submit.prevent="submit"
      class="pa-6"
    >
      <v-text-field
        v-model="userData.username"
        label="Kullanıcı Adı"
        placeholder="Kullanıcı Adınızı Giriniz"
        clearable
        variant="outlined"
        hint="Kullanıcı Adını Giriniz"
        class="mb-2"
      >
      </v-text-field>
      <v-text-field
        v-model="userData.password"
        label="Şifre"
        variant="outlined"
        hint="Şifrenizi Giriniz"
        type="password"
        class="mb-2"
      >
      </v-text-field>
      <v-btn
        :loading="loading"
        @click="submit"
        block
        color="success"
        style="text-transform: unset"
        :text="buttonText"
        class="mb-2"
      >
      </v-btn
      ><v-btn
        @click="registerPageGo"
        block
        color="info"
        style="text-transform: unset"
      >
        {{ registerText }}
      </v-btn>
    </v-form>
  </v-sheet>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/UserStore";
import Swal from "sweetalert2";
import { validate } from "@/middlewares/validate";
import { loginControl } from "@/validations/Users";
export default {
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const form = ref(null);
    const loading = ref(false);
    const buttonText = ref("Giriş Yap");
    const registerText = ref("Kayıt Ol");
    const userData = ref({
      username: null,
      password: null,
    });
    const submit = async () => {
      loading.value = true;
      const { valid } = await form.value.validate();
      if (valid) {
        const responseValidate = await validate(loginControl, {
          username: userData.value.username,
          password: userData.value.password,
        });
        if (responseValidate?.status) {
          const response = await userStore.login({
            username: userData.value.username,
            password: userData.value.password,
          });
          if (response?.status) {
            router.go();
          } else {
            Swal.fire({
              title: response?.message,
              icon: "error",
              confirmButtonText: "Tamam!",
              width: "auto",
            });
            loading.value = false;
          }
        } else {
          Swal.fire({
            title: responseValidate?.message,
            icon: "error",
            confirmButtonText: "Tamam!",
            width: "auto",
          });
        }
      }
      loading.value = false;
    };
    const registerPageGo = () => {
      router.push("/register");
    };
    return {
      form,
      loading,
      buttonText,
      registerText,
      userData,
      submit,
      registerPageGo,
    };
  },
};
</script>
