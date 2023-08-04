<template>
  <!--Set a button handler-->
  <v-btn @click="$emit('eventHandler')" color="blue">
    {{ textContent }}
  </v-btn>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    text: String,
  },
  setup(props) {
    // It's hole functionality depends on props
    const textContent = computed(() => {
      return props.text;
    });

    return {
      textContent,
    };
  },
};
</script>
