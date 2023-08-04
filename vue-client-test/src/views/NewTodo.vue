<template>
  <!--Layout-->
  <BasicLayout>
    <!--Form for creating new todos-->
    <BasicForm create />
  </BasicLayout>
</template>

<script>
import BasicLayout from "../layouts/BasicLayout.vue";
import BasicForm from "../components/forms/BasicForm.vue";

export default {
  components: {
    BasicLayout,
    BasicForm,
  },
};
</script>
