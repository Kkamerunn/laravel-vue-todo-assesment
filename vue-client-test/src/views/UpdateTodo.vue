<template>
  <BasicLayout>
    <v-sheet width="300" class="mx-auto">
      <v-form @submit.prevent="updateTodo">
        <v-text-field
          v-model="formData.title"
          clearable
          type="text"
          label="New title"
        ></v-text-field>
        <v-textarea
          v-model="formData.detail"
          clearable
          auto-grow
          label="New detail"
        ></v-textarea>
        <v-btn type="submit" block class="mt-2">Update Todo</v-btn>
      </v-form>
    </v-sheet>
    <router-link to="/">See my todos</router-link>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import BasicLayout from "../layouts/BasicLayout.vue";
import { getTokenApi } from "../api/token";
import { updateTodoAPI } from "../api/todo";
export default {
  components: {
    BasicLayout,
  },
  setup() {
    let formData = ref({});
    let formError = ref({});
    let loading = ref(false);
    const router = useRouter();
    const route = useRoute();
    const token = getTokenApi();

    onMounted(() => {
      if (!token) return router.push("/login");
    });

    const updateTodo = async () => {
      formError.value = {};
      try {
        await updateTodoAPI(formData.value);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    };

    return {
      formData,
      formError,
      loading,
      updateTodo,
    };
  },
};
</script>

<style scoped></style>
