<template>
  <v-app>
    <Navbar />

    <v-main>
      <v-container
        class="d-flex"
        fluid
      >
        <v-col
          color="#F1F8E9">
          <nuxt />
        </v-col>
      </v-container>
    </v-main>

<!--    <v-footer app>-->
<!--      <span>&copy; {{ new Date().getFullYear() }}</span>-->
<!--    </v-footer>-->
  </v-app>
</template>

<script>
  import Navbar from '../components/Navbar'
  export default {
    components: { Navbar },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    created () {
      this.$vuetify.theme.dark = false;
    },
  }
</script>

<style lang="scss">

</style>
