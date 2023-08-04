<template>
  <!--Here we build the Layout to be used in all the pages that have nothing to do with authentication-->
  <v-container
    ><!--Here we use the Header component that is used to give to the app the navigation functionality-->
    <Header />
    <!--With the slot component we set all the content of the pages that use this layout-->
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
