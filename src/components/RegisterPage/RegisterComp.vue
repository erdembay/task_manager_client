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
      </v-btn
      ><v-btn
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
import { mapActions } from "pinia";
import { useUserStore } from "../../stores/UserStore";
import Swal from "sweetalert2";
import { validate } from "@/middlewares/validate";
import { registerControl } from "@/validations/Users";
export default {
  data() {
    return {
      email: null,
      buttonText: "Zaten Kayıtlı Mısınız?",
      registerText: "Kayıt Ol",
      loading: false,
      userData: {
        username: null,
        email: null,
        password: null,
        passwordRepeat: null,
      },
      passwordRepeatRules: [
        (v) => !!v || "Şifre Tekrarı Gerekli",
        (v) => v === this.userData.password || "Şifreler Eşleşmiyor",
      ],
      emailRules: [
        (v) => !!v || "E-Posta Gerekli",
        (v) => /.+@.+\..+/.test(v) || "Geçerli E-Posta Giriniz",
      ],
      usernameRules: [
        (v) => !!v || "Kullanıcı Adı Gerekli",
        (v) =>
          (v && v.length >= 3) || "Kullanıcı Adı En Az 4 Karakter Olmalıdır",
      ],
      passwordRules: [
        (v) => !!v || "Şifre Gerekli",
        (v) => (v && v.length >= 8) || "Şifre En Az 8 Karakter Olmalıdır",
        (v) => (v && v.length < 15) || "Şifre En Fazla 15 Karakter Olmalıdır",
      ],
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        const responseValidate = await validate(registerControl, {
          username: this.userData.username,
          email: this.userData.email,
          password: this.userData.password,
          passwordRepeat: this.userData.passwordRepeat,
        });
        if (responseValidate?.status) {
          const response = await this.register({
            username: this.userData.username,
            email: this.userData.email,
            password: this.userData.password,
            passwordRepeat: this.userData.passwordRepeat,
          });
          if (response?.status) {
            Swal.fire({
              title: response?.data?.message,
              icon: "success",
              confirmButtonText: "Tamam!",
            });
            this.cleaner();
          } else {
            Swal.fire({
              title: response?.message,
              icon: "error",
              confirmButtonText: "Tamam!",
              width: "auto",
            });
            this.loading = false;
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
      this.loading = false;
    },
    loginPageGo() {
      this.$router.push("/login");
    },
    cleaner() {
      this.userData.username = null;
      this.userData.email = null;
      this.userData.password = null;
      this.userData.passwordRepeat = null;
    },
    ...mapActions(useUserStore, ["register"]),
  },
};
</script>
