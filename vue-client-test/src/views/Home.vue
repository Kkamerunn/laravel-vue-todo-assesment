<template>
  <!--Layout-->
  <BasicLayout>
    <v-row justify="center" no-gutters>
      <v-col cols="7">
        <!--Card is the component that represents all todo's-->
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
    const router = useRouter(); // Call the router
    const store = useStore(); // Call the store
    const todos = computed(() => store.getters.getTodosList); // Call todos kept in the store
    const token = getTokenApi(); // Call the authenticated user's token

    // On the components mount check if user is authenticated
    // so that the page decides whether the user can acces this page or is redirected
    // otherwise the component queries all todos from database that belong to the authenticated users
    onMounted(async () => {
      if (!token) {
        return router.push("/login");
      } else {
        getTodos();
      }
    });

    // Before the components unmount we clean the todo's list kept in store
    onBeforeUnmount(() => {
      store.dispatch("addTodosList", []);
    });

    // Get todos and save them in the store
    const getTodos = async () => {
      const todosResponse = await getTodosAPI();
      store.dispatch("addTodosList", todosResponse);
    };

    // Redirects to the edit todo's page
    const goEdit = (todo) => {
      store.dispatch("addTodoUpdate", todo);
      router.push(`/update-todo/${todo.id}`);
    };

    // Delete todo
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
