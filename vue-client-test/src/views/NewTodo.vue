<template>
  <BasicLayout>
    <v-sheet width="300" class="mx-auto">
      <v-form @submit.prevent="createTodo">
        <v-text-field
          v-model="formData.title"
          clearable
          type="text"
          label="Title"
        ></v-text-field>
        <v-textarea
          v-model="formData.detail"
          clearable
          auto-grow
          label="Detail"
        ></v-textarea>
        <v-btn type="submit" block class="mt-2">Create Todo</v-btn>
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
import { useRouter } from "vue-router";
import BasicLayout from "../layouts/BasicLayout.vue";
import { createTodoAPI } from "../api/todo";
import { getTokenApi } from "../api/token";
export default {
  components: {
    BasicLayout,
  },
  setup() {
    let formData = ref({});
    let loading = ref(false);
    const router = useRouter();
    const token = getTokenApi();

    onMounted(() => {
      if (!token) return router.push("/login");
    });

    const createTodo = async () => {
      loading.value = true;

      try {
        await createTodoAPI(formData.value);
        router.push("/");
      } catch (error) {
        console.log(error);
      }

      loading.value = false;
    };

    return {
      formData,
      loading,
      createTodo,
    };
  },
};
</script>
