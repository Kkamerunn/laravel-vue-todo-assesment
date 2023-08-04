<template>
  <!--Here we build the Layout to be used in all the pages that have do with authentication-->
  <v-container fluid style="height: 100vh">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="9">
        <!--With the slot component we set all the content of the pages that use this layout-->
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>
