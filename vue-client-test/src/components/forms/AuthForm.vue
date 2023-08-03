<template>
  <v-sheet width="300" class="mx-auto">
    <template v-if="loading">
      <v-alert type="success" title="Loading..." class="my-4"></v-alert>
    </template>
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
    <v-form @submit.prevent="formSubmitHandler">
      <template v-if="isRegister">
        <v-text-field
          v-model="formData.name"
          placeholder="Enter your name"
          type="text"
          label="Name"
        ></v-text-field>
      </template>
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
      <template v-if="isRegister">
        <v-text-field
          v-model="formData.repeatPassword"
          :readonly="loading"
          clearable
          type="password"
          label="Repeat password"
          placeholder="Repeat your password"
        ></v-text-field>
      </template>
      <v-btn type="submit" block class="mt-2">{{ submitBtnText }}</v-btn>
    </v-form>
    <CTAGroup
      :routeDirection="routeCTADirection"
      :buttonTextContent="ctaBtnTextContent"
      :textContent="ctaTextContent"
    />
  </v-sheet>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { registerAPI, loginAPI } from "../../api/user";
import { useRouter } from "vue-router";
import { getTokenApi } from "../../api/token";
import CTAGroup from "../CTAGroup.vue";

export default {
  components: {
    CTAGroup,
  },
  props: {
    register: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const formSubmitHandler = computed(() => {
      return props.register === true ? () => register() : () => login();
    });
    const isRegister = computed(() => {
      return props.register && true;
    });
    const submitBtnText = computed(() => {
      return props.register === true ? "Sign up" : "Sign in";
    });
    const routeCTADirection = computed(() => {
      return props.register === true ? "login" : "register";
    });
    const ctaTextContent = computed(() => {
      return props.register === true
        ? "Already have an account?"
        : "Don't have an account yet?";
    });
    const ctaBtnTextContent = computed(() => {
      return props.register === true ? "login" : "create account";
    });
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
        loading.value = false;
      }

      loading.value = false;

      if (formError.value !== null) {
        setTimeout(() => {
          formError.value = null;
        }, 8000);
      }
    };

    const login = async () => {
      loading.value = true;

      try {
        await loginAPI(formData.value);
        if (getTokenApi()) return router.push("/");
      } catch (error) {
        formError.value = error.response.data.errors;
        loading.value = false;
      }

      if (formError.value !== null) {
        setTimeout(() => {
          formError.value = null;
        }, 8000);
      }
    };

    return {
      formData,
      register,
      login,
      formError,
      loading,
      formSubmitHandler,
      isRegister,
      submitBtnText,
      routeCTADirection,
      ctaTextContent,
      ctaBtnTextContent,
    };
  },
};
</script>
