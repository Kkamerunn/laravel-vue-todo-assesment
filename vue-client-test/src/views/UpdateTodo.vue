<template>
  <!--Layout-->
  <BasicLayout>
    <!--Form for updating todos-->
    <BasicForm />
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
