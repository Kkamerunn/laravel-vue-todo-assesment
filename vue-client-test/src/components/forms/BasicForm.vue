<template>
  <!--Build This basic form component to be used by new-todo and update-todo pages-->
  <v-sheet width="300" class="mx-auto">
    <!--Alert to be shown when loading-->
    <template v-if="loading">
      <v-alert type="success" title="Loading..." class="my-4"></v-alert>
    </template>
    <!--Form-->
    <v-form @submit.prevent="formSubmitHandler">
      <v-text-field
        v-model="formData.title"
        clearable
        type="text"
        :label="textFieldValue"
      ></v-text-field>
      <v-textarea
        v-model="formData.detail"
        clearable
        auto-grow
        :label="textAreaValue"
      ></v-textarea>
      <v-btn type="submit" block class="mt-2">{{ submitButtonValue }}</v-btn>
    </v-form>
    <!--Redirect button-->
    <v-sheet class="d-flex flex-column align-center">
      <v-btn to="/" class="mt-3 bg-light-blue-lighten-1 text-white"
        >See my todos</v-btn
      >
    </v-sheet>
  </v-sheet>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { createTodoAPI, updateTodoAPI } from "../../api/todo";
import { getTokenApi } from "../../api/token";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  props: {
    // This prop defines whether the form is going to be used to create a new todo or update one
    create: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // Save all props in computed properties so that we transform them to use them on the template
    const formSubmitHandler = computed(() => {
      return props.create === true ? () => createTodo() : () => updateTodo();
    });
    const textFieldValue = computed(() => {
      return props.create === true ? "Title" : "New title";
    });
    const textAreaValue = computed(() => {
      return props.create === true ? "Detail" : "New detail";
    });
    const submitButtonValue = computed(() => {
      return props.create === true ? "Create Todo" : "Update Todo";
    });
    const router = useRouter(); // Get the router to use the navigation
    const token = getTokenApi(); // Get the token of the authenticated user
    const route = useRoute(); // Get the route object
    const store = useStore(); // Get the store

    // Create the form fields data propertie values
    let formData = ref(
      props.create === true
        ? {}
        : {
            title: store.getters.getTodoUpdate["title"],
            detail: store.getters.getTodoUpdate["detail"],
          }
    );

    let loading = ref(false);

    // Check if user is authenticated
    onMounted(() => {
      if (!token) return router.push("/login");
    });

    // Handle the todo's updating
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

    // Handle a new todo creation
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
      formSubmitHandler,
      textFieldValue,
      textAreaValue,
      submitButtonValue,
    };
  },
};
</script>
