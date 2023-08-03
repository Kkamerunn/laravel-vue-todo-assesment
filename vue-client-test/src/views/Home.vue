<template>
  <BasicLayout>
    <v-row justify="center" no-gutters>
      <v-col cols="7">
        <v-card v-for="todo in todos" :key="todo.id" class="mx-auto my-10">
          <v-card-title>{{ todo.title }}</v-card-title>
          <v-card-text>{{ todo.detail }}</v-card-text>
          <v-btn @click="goEdit(todo)" color="blue" class="mx-5 my-4">
            Edit
          </v-btn>
          <v-btn @click="deleteTodo(todo.id)" color="blue" class="mx-2 my-4"
            >Remove</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </BasicLayout>
</template>

<script>
import { computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { getTokenApi } from "../api/token";
import { getTodosAPI, deleteTodoAPI } from "../api/todo";
import BasicLayout from "../layouts/BasicLayout.vue";
import { useStore } from "vuex";

export default {
  components: {
    BasicLayout,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const todos = computed(() => store.getters.getTodosList);
    const token = getTokenApi();

    onMounted(async () => {
      if (!token) {
        return router.push("/login");
      } else {
        getTodos();
      }
    });

    onBeforeUnmount(() => {
      store.dispatch("addTodosList", []);
    });

    const getTodos = async () => {
      const todosResponse = await getTodosAPI();
      store.dispatch("addTodosList", todosResponse);
    };

    const goEdit = (todo) => {
      store.dispatch("addTodoUpdate", todo);
      router.push(`/update-todo/${todo.id}`);
    };

    const deleteTodo = (id) => {
      deleteTodoAPI(id);
      store.dispatch("addTodoUpdate", {
        title: "",
        detail: "",
      });
      getTodos();
    };

    return {
      todos,
      goEdit,
      deleteTodo,
    };
  },
};
</script>
