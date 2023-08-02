<template>
  <AuthLayout>
    <v-sheet width="300" class="mx-auto">
      <v-sheet v-if="formError">
        <v-alert
          v-for="(err, index) in formError"
          :key="index"
          type="error"
          :title="err[0]"
          class="my-3"
          density="compact"
        ></v-alert>
      </v-sheet>
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
    let formError = ref(null);
    let loading = ref(false);
    const router = useRouter();
    const token = getTokenApi();

    onMounted(() => {
      if (token) return router.push("/");
    });

    const login = async () => {
      loading.value = true;

      try {
        await loginAPI(formData.value);
        if (getTokenApi()) return router.push("/");
      } catch (error) {
        formError.value = error.response.data.errors;
      }

      if (formError.value !== null) {
        setTimeout(() => {
          formError.value = null;
        }, 8000);
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
