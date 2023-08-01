<template>
  <v-container>
    <v-app>
      <v-app-bar color="primary" density="compact">
        <v-app-bar-title
          ><v-btn @click="goHome">Todo Vuetify</v-btn></v-app-bar-title
        >
        <v-btn @click="goNewTodo">New Todo</v-btn>
        <v-btn @click="logout">Log out</v-btn>
      </v-app-bar>
    </v-app>
    <slot />
  </v-container>
</template>

<script>
import { logoutAPI } from "../api/user";
import { useRouter } from "vue-router";

export default {
  name: "BasicLayout",
  components: {},
  setup() {
    const router = useRouter();

    const logout = async () => {
      await logoutAPI();
      router.push("/login");
    };

    const goNewTodo = () => {
      router.push("/new-todo");
    };

    const goHome = () => {
      router.push("/");
    };

    return {
      logout,
      goNewTodo,
      goHome,
    };
  },
};
</script>
