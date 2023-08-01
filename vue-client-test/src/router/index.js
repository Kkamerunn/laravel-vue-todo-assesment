import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import NewTodo from "../views/NewTodo.vue";
import UpdateTodo from "../views/UpdateTodo.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/new-todo",
      name: "new-todo",
      component: NewTodo,
    },
    {
      path: "/update-todo/:id",
      name: "update-todo",
      component: UpdateTodo,
    },
  ],
});

export default router;
