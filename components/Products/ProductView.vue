<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card class="modal_card_view">
        <v-card-subtitle class="card-subtitle">Властивості</v-card-subtitle>
        <v-card-text class="d-flex flex-column align-center">
          <div class="modal_card_view_info">
            <div>{{ description }}</div><br>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="handleClose"
          >
            Закрити
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      dialog: {
        type: Boolean,
        required: true,
        default: false
      },
      handleClose: {
        type: Function,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    },
    name: 'ProductView'
  }
</script>

<style lang="scss">
  .modal_card_view {
    padding: 20px;
    &_info {
      opacity: 0.7;
    }
  }
</style>
