<template>
  <AuthLayout>
    <AuthForm />
  </AuthLayout>
</template>

<script>
import AuthLayout from "../layouts/AuthLayout.vue";
import AuthForm from "../components/forms/AuthForm.vue";

export default {
  components: {
    AuthLayout,
    AuthForm,
  },
};
</script>
