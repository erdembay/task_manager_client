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
        :rules="usernameRules"
        clearable
        variant="outlined"
        hint="Kullanıcı Adını Giriniz"
        class="mb-2"
      >
      </v-text-field>
      <v-text-field
        v-model="userData.email"
        :rules="emailRules"
        label="E-Posta"
        variant="outlined"
        hint="E-Posta Adresinizi Giriniz"
        class="mb-2"
      >
      </v-text-field>
      <v-text-field
        v-model="userData.password"
        :rules="passwordRules"
        label="Şifre"
        variant="outlined"
        hint="Şifrenizi Giriniz"
        type="password"
        class="mb-2"
      >
      </v-text-field>
      <v-text-field
        v-model="userData.passwordRepeat"
        :rules="passwordRepeatRules"
        label="Şifre Tekrarı"
        variant="outlined"
        hint="Şifrenizi Tekrarı Giriniz"
        type="password"
        class="mb-2"
        @update:model-value="this.$refs.form.validate()"
      >
      </v-text-field>
      <v-btn
        :loading="loading"
        @click="submit"
        block
        color="success"
        style="text-transform: unset"
        :text="registerText"
        class="mb-2"
      >
      </v-btn>
      <v-btn
        @click="loginPageGo"
        block
        color="info"
        style="text-transform: unset"
      >
        {{ buttonText }}
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
import { registerControl } from "@/validations/Users";
export default {
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const form = ref(null);
    const loading = ref(false);
    const buttonText = ref("Zaten Kayıtlı Mısınız?");
    const registerText = ref("Kayıt Ol");
    const userData = ref({
      username: null,
      email: null,
      password: null,
      passwordRepeat: null,
    });
    const passwordRepeatRules = [
      (v) => !!v || "Şifre Tekrarı Gerekli",
      (v) => v === userData.value.password || "Şifreler Eşleşmiyor",
    ];
    const emailRules = [
      (v) => !!v || "E-Posta Gerekli",
      (v) => /.+@.+\..+/.test(v) || "Geçerli E-Posta Giriniz",
    ];
    const usernameRules = [
      (v) => !!v || "Kullanıcı Adı Gerekli",
      (v) => (v && v.length >= 3) || "Kullanıcı Adı En Az 4 Karakter Olmalıdır",
    ];
    const passwordRules = [
      (v) => !!v || "Şifre Gerekli",
      (v) => (v && v.length >= 8) || "Şifre En Az 8 Karakter Olmalıdır",
      (v) => (v && v.length < 15) || "Şifre En Fazla 15 Karakter Olmalıdır",
    ];
    const submit = async () => {
      loading.value = true;
      const { valid } = await form.value.validate();
      if (valid) {
        const responseValidate = await validate(registerControl, {
          username: userData.value.username,
          email: userData.value.email,
          password: userData.value.password,
          passwordRepeat: userData.value.passwordRepeat,
        });
        if (responseValidate?.status) {
          const response = await userStore.register({
            username: userData.value.username,
            email: userData.value.email,
            password: userData.value.password,
            passwordRepeat: userData.value.passwordRepeat,
          });
          if (response?.status) {
            Swal.fire({
              title: response?.data?.message,
              icon: "success",
              confirmButtonText: "Tamam!",
            });
            cleaner();
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
    const loginPageGo = () => {
      router.push("/login");
    };
    const cleaner = () => {
      userData.value.username = null;
      userData.value.email = null;
      userData.value.password = null;
      userData.value.passwordRepeat = null;
    };
    return {
      form,
      loading,
      buttonText,
      registerText,
      userData,
      passwordRepeatRules,
      emailRules,
      usernameRules,
      passwordRules,
      submit,
      loginPageGo,
      cleaner,
    };
  },
};
</script>
