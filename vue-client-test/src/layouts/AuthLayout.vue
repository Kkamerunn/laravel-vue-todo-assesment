<template>
  <v-container fluid style="height: 100vh">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="9">
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
