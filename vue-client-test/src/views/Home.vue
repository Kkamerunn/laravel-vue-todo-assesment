<template>
  <BasicLayout>
    <v-row justify="center" no-gutters>
      <v-col cols="7">
        <Card
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          :editHandler="goEdit"
          :deleteHandler="deleteTodo"
        />
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
import Card from "../components/Card.vue";
import { useStore } from "vuex";

export default {
  components: {
    BasicLayout,
    Card,
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
