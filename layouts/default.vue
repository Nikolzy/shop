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
  import 'firebase/auth'
  import products from '@/assets/products.json'

  export default {
    components: { Navbar },
    middleware: 'auth',
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      products: products
    }),
    created () {
      this.$vuetify.theme.dark = false;
    },
    async mounted() {
      await this.$store.dispatch('user/getUserInfo')
      await this.$store.dispatch('cart/setProducts', this.products)
      // await this.$store.dispatch('cart/getCartItems');
      // await this.$store.dispatch('cart/getProductsAmount');
    },
  }
</script>

<style lang="scss">

</style>
