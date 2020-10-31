<template>
  <v-container fluid fill-height class="loading-container" style="background-color: aliceblue;">
    <v-layout justify-center align-top>
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'LoadingComponent'
};
</script>

<style scoped>

</style>
