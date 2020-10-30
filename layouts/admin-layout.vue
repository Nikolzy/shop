<template>
  <v-app id="inspire">
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
              <v-list-item-title>
                Товари
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar
        app
        clipped-left
        color="#382b3b"
      >
        <div class="d-flex align-center">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Application</v-toolbar-title>
        </div>
        <div>
        </div>
      </v-app-bar>
    </div>
    <v-content style="color: #212121; background-color: aliceblue">
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  }),
  props: {
    source: String
  },
  methods: {
    handleRouter (path) {
      this.$router.push(`/admin/${path}`);
    }
  }
}
</script>
