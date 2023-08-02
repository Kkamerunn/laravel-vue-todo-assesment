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
      <v-sheet class="d-flex flex-column align-center">
        <v-btn to="/" class="mt-3 bg-light-blue-lighten-1 text-white"
          >See my todos</v-btn
        >
      </v-sheet>
    </v-sheet>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import BasicLayout from "../layouts/BasicLayout.vue";
import { getTokenApi } from "../api/token";
import { updateTodoAPI } from "../api/todo";
import { useStore } from "vuex";

export default {
  components: {
    BasicLayout,
  },
  setup() {
    const store = useStore();
    let formData = ref({
      title: store.getters.getTodoUpdate["title"],
      detail: store.getters.getTodoUpdate["detail"],
    });
    let formError = ref({});
    let loading = ref(false);
    const router = useRouter();
    const route = useRoute();
    const token = getTokenApi();

    onMounted(async () => {
      if (!token) return router.push("/login");
    });

    const updateTodo = async () => {
      formError.value = {};
      const todoId = route.params.id;
      try {
        await updateTodoAPI(formData.value, todoId);
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
