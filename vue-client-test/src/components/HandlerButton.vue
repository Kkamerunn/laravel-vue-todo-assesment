<template>
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
    const textContent = computed(() => {
      return props.text;
    });

    return {
      textContent,
    };
  },
};
</script>
