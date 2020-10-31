<template>
  <div style="display: inline-block;">
    <v-dialog v-model="dialog" persistent max-width="290" light>
      <v-card>
        <v-card-title class="headline" style="word-break: break-word;">
          Підтверждення дії
        </v-card-title>
        <v-card-text>{{ messageText }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="confirmAction">
            Так
          </v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">
            Ні
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          small
          v-bind="attrs"
          v-on="on"
          @click.stop="dialog = true"
        >
          mdi-delete
        </v-icon>
      </template>
      <span>Удалить</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: 'DeleteButtonWithConfirm',
  props: {
    messageText: {
      type: String
    }
  },
  data () {
    return {
      dialog: false
    };
  },
  methods: {
    confirmAction () {
      this.dialog = false;
      this.$emit('deleteItem');
    }
  }
};
</script>

<style scoped>

</style>
