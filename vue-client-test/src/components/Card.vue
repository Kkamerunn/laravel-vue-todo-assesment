<template>
  <v-card class="mx-auto my-10">
    <v-card-title>{{ todo.title }}</v-card-title>
    <v-card-text>{{ todo.detail }}</v-card-text>
    <HandlerButton @event-handler="edit(todo)" text="Edit" class="mx-5 my-4" />
    <HandlerButton
      @event-handler="remove(todo.id)"
      text="Remove"
      class="mx-2 my-4"
    />
  </v-card>
</template>

<script>
import { computed } from "vue";
import HandlerButton from "../components/HandlerButton.vue";

export default {
  components: {
    HandlerButton,
  },
  props: ["todo", "editHandler", "deleteHandler"],
  setup(props) {
    const todo = computed(() => {
      return props.todo;
    });
    const edit = computed(() => {
      return props.editHandler;
    });
    const remove = computed(() => {
      return props.deleteHandler;
    });

    return {
      todo,
      edit,
      remove,
    };
  },
};
</script>
