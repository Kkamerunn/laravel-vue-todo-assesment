<template>
  <AuthLayout>
    <v-sheet width="300" class="mx-auto">
      <v-form @submit.prevent="login">
        <v-text-field
          v-model="formData.email"
          placeholder="Enter an email"
          type="email"
          label="Email"
        ></v-text-field>
        <v-text-field
          v-model="formData.password"
          :readonly="loading"
          clearable
          type="password"
          label="Password"
          placeholder="Enter a password"
        ></v-text-field>
        <v-btn type="submit" block class="mt-2">Sign in</v-btn>
      </v-form>
      <v-sheet class="d-flex flex-column align-center">
        <p class="mt-5">Don't have an account yet?</p>
        <v-btn to="/register" class="mt-1 bg-light-blue-lighten-1 text-white"
          >Create account</v-btn
        >
      </v-sheet>
    </v-sheet>
  </AuthLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
import { loginAPI } from "../api/user";
import { getTokenApi } from "../api/token";
export default {
  components: {
    AuthLayout,
  },
  setup() {
    let formData = ref({});
    let formError = ref({});
    let loading = ref(false);
    const router = useRouter();
    const token = getTokenApi();

    onMounted(() => {
      if (token) return router.push("/");
    });

    const login = async () => {
      formError.value = {};
      try {
        await loginAPI(formData.value);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    };

    return {
      formData,
      formError,
      loading,
      login,
    };
  },
};
</script>

<style scoped></style>
