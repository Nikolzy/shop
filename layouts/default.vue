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
  import * as firebase from 'firebase/app'
  import 'firebase/auth'

  export default {
    components: { Navbar },
    middleware: 'auth',
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    created () {
      this.$vuetify.theme.dark = false;
    },
    async mounted() {
      await this.fetchUserInfo();
    },
    methods: {
      // setupFirebase () {
      //   firebase.auth().onAuthStateChanged(user => {
      //     if (user) {
      //       console.log('loggedIn')
      //     } else {
      //       console.log('not logged in')
      //     }
      //   })
      // },
      fetchUserInfo () {
        this.$store.dispatch('user/getUserInfo').then((res) => {
          this.$store.commit('user/updateUserInfo', res)
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
