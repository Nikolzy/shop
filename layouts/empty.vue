<template>
  <v-app>
    <v-main>
      <div class="modal">
        <div class="login_wrapper">
          <nuxt />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'EmptyLayout'
  }
</script>

<style>
.modal {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #212121;
}
.login_wrapper {
  position: absolute;
  min-width: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
