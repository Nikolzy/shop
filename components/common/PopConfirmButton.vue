<template>
  <div class="d-flex justify-end mr-3">
    <v-btn
      :color="buttonColor"
      dark
      @click.stop="dialog = true"
    >
      <v-icon v-if="type === 'icon'">{{ buttonLabel }}</v-icon>
      <span v-else>{{ buttonLabel }}</span>
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Увага!</v-card-title>

        <v-card-text>
          {{ message }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="triggeredAction"
          >
            Так
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            @click="dialog = false"
          >
            Ні
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      message: String,
      buttonLabel: String,
      buttonColor: String,
      type: String,
      action: Function
    },
    name: 'PopConfirmButton',
    data: () => ({
      dialog: false
    }),
    methods: {
      triggeredAction() {
        this.dialog = false;
        this.action();
      }
    }
  }
</script>

<style lang="scss">
  .headline {
    color: orange;
  }
</style>
