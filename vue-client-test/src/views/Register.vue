<template>
  <AuthLayout>
    <v-sheet width="300" class="mx-auto">
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
    let formError = ref({});
    let loading = ref(false);
    const router = useRouter();
    const token = getTokenApi();
    const rules = [
      (value) => {
        if (value) return true;
        return "This field is madatory";
      },
    ];

    onMounted(() => {
      if (token) return router.push("/");
    });

    const register = async () => {
      formError.value = {};
      loading.value = true;

      try {
        await registerAPI(formData.value);
        router.push("/");
      } catch (error) {
        console.log(error);
      }

      loading.value = false;
    };

    return {
      formData,
      register,
      formError,
      loading,
      rules,
    };
  },
};
</script>

<style scoped></style>
