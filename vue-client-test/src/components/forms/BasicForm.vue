<template>
  <v-sheet width="300" class="mx-auto">
    <template v-if="loading">
      <v-alert type="success" title="Loading..." class="my-4"></v-alert>
    </template>
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
    create: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
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
    const router = useRouter();
    const token = getTokenApi();
    const route = useRoute();
    const store = useStore();
    let formData = ref(
      props.create === true
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
      formSubmitHandler,
      textFieldValue,
      textAreaValue,
      submitButtonValue,
    };
  },
};
</script>
