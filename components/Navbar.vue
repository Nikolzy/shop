<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      color="#DCEDC8"
      app
      clipped
    >
      <v-list
        class="navbar"
        dense>
        <v-list-item link @click="handleRouter('/products')">
          <v-list-item-action>
            <v-icon>mdi-shopping</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Зробити замовлення
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="handleRouter('/history')">
          <v-list-item-action>
            <v-icon>mdi-history</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <nuxt-link to="/history">
              <v-list-item-title>
                Історія замовлень
              </v-list-item-title>
            </nuxt-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="handleRouter('/contacts')">
          <v-list-item-action>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <nuxt-link to="/contacts">
              <v-list-item-title>
                Контакти
              </v-list-item-title>
            </nuxt-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="handleRouter('/delivery')">
          <v-list-item-action>
            <v-icon>mdi-truck-delivery</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <nuxt-link to="/delivery">
              <v-list-item-title>
                Доставка
              </v-list-item-title>
            </nuxt-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      color="#9CCC65"
    >
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Application</v-toolbar-title>
      </div>
      <div>
        <nuxt-link to="/basket" class="nav-item">
          <v-badge
          :content="productsAmount"
          :value="productsAmount"
          :key="productsAmount"
          color="red"
          overlap
          >
            <v-icon>mdi-basket</v-icon>
          </v-badge>
        </nuxt-link>
        <nuxt-link to="/profile" class="nav-item">
          <v-icon>mdi-account</v-icon>
        </nuxt-link>
        <nuxt-link to="/login?message=logout" class="nav-item">
          <v-icon @click="logout">mdi-logout</v-icon>
        </nuxt-link>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
  import * as firebase from 'firebase/app'
  import 'firebase/auth'

  export default {
    name: 'Navbar',
    props: {
      source: String,
    },
    data: () => ({
      drawer: null
    }),
    created () {
      this.$vuetify.theme.dark = false;
    },
    computed: {
      productsAmount() {
        return this.$store.getters['cart/getProductsAmount'];
      }
    },
    methods: {
      handleRouter (path) {
        this.$router.push(path);
      },
      async logout () {
        // Cookies.remove('ACCESS_TOKEN')
        await this.$store.dispatch('auth/logout');
      }
    }
  }
</script>

<style lang="scss">
  .navbar {
    .v-list-item__title {
      color: rgba(0, 0, 0, 0.87);
    }
  }
  .v-toolbar__content {
    width: 100%;
    justify-content: space-between;
  }
  .nav-item:not(:last-child) {
    margin-right: 10px;
  }
  a {
    text-decoration: none;
  }
</style>
