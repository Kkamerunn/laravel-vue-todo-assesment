<template>
  <v-container>
    <Header />
    <slot />
  </v-container>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "BasicLayout",
  components: {
    Header,
  },
};
</script>
