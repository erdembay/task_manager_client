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
        type="submit"
        block
        color="info"
        :text="buttonText"
      >
      </v-btn>
    </v-form>
  </v-sheet>
</template>
<script>
import { mapActions } from "pinia";
import { useUserStore } from "../../stores/UserStore";
import Swal from "sweetalert2";
import { validate } from "@/middlewares/validate";
import { loginControl } from "@/validations/Users";
export default {
  data() {
    return {
      email: null,
      buttonText: "Giriş Yap",
      loading: false,
      userData: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        const responseValidate = await validate(loginControl, {
          username: this.userData.username,
          password: this.userData.password,
        });
        if (responseValidate?.status) {
          const response = await this.login({
            username: this.userData.username,
            password: this.userData.password,
          });
          if (response?.status) {
            this.$router.push("/");
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
    ...mapActions(useUserStore, ["login"]),
  },
};
</script>
