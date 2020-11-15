<template>
  <v-app>
    <div>
      <v-navigation-drawer
        v-model="drawer"
        color="#8972fc"
        fixed
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
              <v-list-item-title style="color: #fff;">
                Товари
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="handleRouter('/users')">
            <v-list-item-action>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title style="color: #fff;">
                Користувачі
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="handleRouter('/statistics')">
            <v-list-item-action>
              <v-icon>mdi-chart-pie</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title style="color: #fff;">
                Статистика
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-expansion-panels
            v-model="panel"
            multiple
          >
            <v-expansion-panel style="background-color: #8972fc;">
              <v-expansion-panel-header>Налаштування</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list-item link @click="handleRouter('/settings/contacts')">
                  <v-list-item-action>
                    <v-icon>mdi-account-box</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title style="color: #fff;">
                      Контакти
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link @click="handleRouter('/settings/delivery')">
                  <v-list-item-action>
                    <v-icon>mdi-truck-delivery</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title style="color: #fff;">
                      Доставка
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar
        app
        clipped-left
        color="#382b3b"
      >
        <div class="d-flex align-center">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Admin Panel</v-toolbar-title>
        </div>
        <v-tooltip
          v-model="show"
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <nuxt-link to="/products" class="nav-item" style="color: white">
                <v-icon>mdi-keyboard-return</v-icon>
              </nuxt-link>
            </v-btn>
          </template>
          <span>До магазину</span>
        </v-tooltip>
      </v-app-bar>
    </div>
    <v-main style="color: #212121; background-color: aliceblue">
      <v-layout pa-8>
        <nuxt />
      </v-layout>
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: 'admin',
  data: () => ({
    drawer: null,
    show: false,
    panel: false
  }),
  props: {
    source: String
  },
  created () {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    handleRouter (path) {
      this.$router.push(`/admin${path}`);
    }
  }
}
</script>

<style lang="scss">
  .navbar {
    .v-expansion-panel-content__wrap {
      padding: 0 !important;
    }
  }
</style>
