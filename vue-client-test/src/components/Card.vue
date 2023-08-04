<template>
  <v-card class="mx-auto my-10">
    <!--Build the Card component to be used in Home page-->
    <v-card-title>{{ todo.title }}</v-card-title>
    <v-card-text>{{ todo.detail }}</v-card-text>
    <!--This Card component uses HandlerButton component to handle the todo's edit and remove actions-->
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
    // Receive all the props and save them in computed properties so that they can be consumed on the template
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
