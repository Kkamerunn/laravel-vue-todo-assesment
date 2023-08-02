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
      <v-form @submit.prevent="register">
        <v-text-field
          v-model="formData.name"
          placeholder="Enter your name"
          type="text"
          label="Name"
        ></v-text-field>
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
        <v-text-field
          v-model="formData.repeatPassword"
          :readonly="loading"
          clearable
          type="password"
          label="Repeat password"
          placeholder="Repeat your password"
        ></v-text-field>
        <v-btn type="submit" block class="mt-2">Sign up</v-btn>
      </v-form>
      <v-sheet class="d-flex flex-column align-center">
        <p class="mt-5">Already have an account?</p>
        <v-btn to="/login" class="mt-1 bg-light-blue-lighten-1 text-white"
          >Log in</v-btn
        >
      </v-sheet>
    </v-sheet>
  </AuthLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import { registerAPI } from "../api/user";
import { useRouter } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
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

    const register = async () => {
      loading.value = true;

      try {
        await registerAPI(formData.value);
        if (getTokenApi()) return router.push("/");
      } catch (error) {
        formError.value = error.response.data.errors;
      }

      loading.value = false;

      if (formError.value !== null) {
        setTimeout(() => {
          formError.value = null;
        }, 8000);
      }
    };

    return {
      formData,
      register,
      formError,
      loading,
    };
  },
};
</script>

<style scoped></style>
