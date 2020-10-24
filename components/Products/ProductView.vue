<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
      @click:outside="handleClose"
    >
      <v-card class="modal_card_view">
        <v-card-title class="card-subtitle">{{ item.title }}</v-card-title>
        <v-card-text class="d-flex flex-column align-center">
          <div class="d-flex justify-center">
            <v-img :src="`/product_images/${item.imageURL}`" style="max-width: 400px; width: 100%"></v-img>
          </div>
        </v-card-text>
        <v-card-text class="d-flex flex-column align-center">
          <div class="modal_card_view_info">
            <div>{{ item.description }}</div><br>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
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
      item: {
        type: Object,
        required: true
      },
      handleClose: {
        type: Function,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    },
    name: 'ProductView'
  }
</script>

<style lang="scss">
  .modal_card_view {
    &_info {
      opacity: 0.7;
    }
    .v-image {
      max-width: 250px !important;
    }
  }
</style>
