<template>
  <BasicLayout>
    <v-row justify="center" no-gutters>
      <v-col cols="7">
        <v-card v-for="todo in todos" :key="todo.id" class="mx-auto">
          <v-card-title>{{ todo.title }}</v-card-title>
          <v-card-text>{{ todo.detail }}</v-card-text>
          <v-btn color="blue" class="mx-5 my-4">
            <router-link
              class="text-decoration-none text-white"
              :to="`/update-todo/${todo.id}`"
              >Edit</router-link
            >
          </v-btn>
          <v-btn color="blue" class="mx-2 my-4">Remove</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { getTokenApi } from "../api/token";
import { getTodosAPI } from "../api/todo";
import BasicLayout from "../layouts/BasicLayout.vue";

export default {
  components: {
    BasicLayout,
    RouterLink,
  },
  setup() {
    const token = getTokenApi();
    const router = useRouter();
    let todos = ref([]);

    onMounted(() => {
      if (!token) return router.push("/login");
    });

    onMounted(async () => {
      const todosResponse = await getTodosAPI();
      console.log(todosResponse);
      todos.value = todosResponse;
      console.log(todos.value);
    });

    return {
      todos,
    };
  },
};
</script>
