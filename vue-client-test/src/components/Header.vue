<template>
  <!--Build the Header component used for navigation-->
  <v-app>
    <v-app-bar color="blue" density="compact">
      <v-app-bar-title
        ><v-btn @click="goHome">Todo Vuetify</v-btn></v-app-bar-title
      >
      <v-btn @click="goNewTodo">New Todo</v-btn>
      <v-btn @click="logout">Log out</v-btn>
    </v-app-bar>
  </v-app>
</template>

<script>
import { logoutAPI } from "../api/user";
import { useRouter } from "vue-router";

export default {
  name: "Header",
  setup() {
    const router = useRouter(); // Call the router to navigate

    // Sign the user out of the app
    const logout = async () => {
      await logoutAPI();
      router.push("/login");
    };

    // Navigate to the create Todo's page
    const goNewTodo = () => {
      router.push("/new-todo");
    };

    // Navigate to home
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

<style scoped>
.v-layout--full-height {
  height: 10vh !important;
}
</style>
