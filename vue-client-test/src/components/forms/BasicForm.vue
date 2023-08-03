<template>
  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent="func === 'create' ? createTodo : updateTodo">
      <v-text-field
        v-model="formData.title"
        clearable
        type="text"
        :label="func === 'create' ? 'Title' : 'New title'"
      ></v-text-field>
      <v-textarea
        v-model="formData.detail"
        clearable
        auto-grow
        :label="func === 'create' ? 'Detail' : 'New detail'"
      ></v-textarea>
      <v-btn type="submit" block class="mt-2">{{
        func === "create" ? "Create Todo" : "Update Todo"
      }}</v-btn>
    </v-form>
    <v-sheet class="d-flex flex-column align-center">
      <v-btn to="/" class="mt-3 bg-light-blue-lighten-1 text-white"
        >See my todos</v-btn
      >
    </v-sheet>
  </v-sheet>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { createTodoAPI } from "../api/todo";
import { getTokenApi } from "../api/token";
import { useRouter, useRoute } from "vue-router";
import { updateTodoAPI } from "../api/todo";
import { useStore } from "vuex";

export default {
  components: {
    BasicLayout,
  },
  setup(props) {
    const func = computed(() => {
      return props.functionality;
    });
    const router = useRouter();
    const token = getTokenApi();
    const route = useRoute();
    const store = useStore();
    let formData = ref(
      func === "create"
        ? {}
        : {
            title: store.getters.getTodoUpdate["title"],
            detail: store.getters.getTodoUpdate["detail"],
          }
    );
    let loading = ref(false);

    onMounted(() => {
      if (!token) return router.push("/login");
    });

    const updateTodo = async () => {
      loading.value = true;

      const todoId = route.params.id;

      try {
        await updateTodoAPI(formData.value, todoId);
        router.push("/");
      } catch (error) {
        console.log(error);
      }

      loading.value = false;
    };

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
      updateTodo,
      func,
    };
  },
};
</script>
