<template>
  <!--Build a CTA component to be used in the Authentication form component for redirection-->
  <v-sheet class="d-flex flex-column align-center">
    <p class="mt-5">{{ textContent }}</p>
    <v-btn
      :to="`/${routeDirection}`"
      class="mt-1 bg-light-blue-lighten-1 text-white"
      >{{ ctaTextContent }}</v-btn
    >
  </v-sheet>
</template>

<script>
import { computed } from "vue";

export default {
  props: ["textContent", "buttonTextContent", "routeDirection"],
  setup(props) {
    // Receive all the props and save them in computed properties so that they can be consumed on the template
    const textContent = computed(() => {
      return props.textContent;
    });

    const ctaTextContent = computed(() => {
      return props.buttonTextContent;
    });

    const routeDirection = computed(() => {
      return props.routeDirection;
    });

    return {
      textContent,
      ctaTextContent,
      routeDirection,
    };
  },
};
</script>
