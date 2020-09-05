<template>
      <v-flex xs12 md6 lg6 col-xs-12 col-md-12 col-lg-6>
        <v-card class="card-item">
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-text class="d-flex flex-column align-center">
            <div class="d-flex justify-center">
              <v-img :src="`/product_images/${item.imageURL}`" style="max-width: 400px; width: 100%"></v-img>
            </div>
          </v-card-text>
          <v-card-subtitle class="card-subtitle">Властивості</v-card-subtitle>
          <v-card-text class="d-flex flex-column align-center">
            <div class="card-info">
              <div>{{ item.description }}</div><br>
            </div>
          </v-card-text>
          <v-card-actions class="actions">
            <v-text-field v-model="count" :disabled="showMessage" type="number" min="1"/>
            <v-btn v-if="!showMessage" color="green" @click="addToCart">Додати до кошику</v-btn>
            <v-btn v-else color="red" @click="removeFromCart">Видалити з кошика</v-btn>
          </v-card-actions>
          <v-alert v-if="showMessage" type="success">У кошику {{ count }}</v-alert>
        </v-card>
      </v-flex>
</template>

<script>
  export default {
    props: {
      item: Object
    },
    name: 'product-card',
    data: () => ({
      count: 1,
      showMessage: false
    }),
    methods: {
      addToCart () {
        if (this.count >= 1) {
          this.showMessage = true;
          this.$store.commit('cart/updateProductsAmount', {
            id: this.item.id,
            count: this.count
          });
        }
      },
      removeFromCart () {
        this.showMessage = false;
        this.$store.commit('cart/updateProductsAmount', {
          id: this.item.id,
          count: 0
        });
      }
    }
  }
</script>

<style lang="scss">
  .actions {
    display: flex;
    justify-content: flex-end;
    .v-input {
      max-width: 50px;
      min-width: 30px;
      margin-right: 10px;
      margin-left: 5px;
    }
  }
  .card-subtitle {
    font-weight: bold;
    margin: 0;
  }
  .card-info {
    width: 100%;
  }
  .v-image {
    .v-responsive__content {
      width: 400px !important;
      height: 300px;
      transition: all .3s linear;
    }
  }

  @media screen and (max-width: 500px){
    .v-image {
      .v-responsive__content {
        width: 300px !important;
        height: auto !important;
      }
    }
  }
  @media screen and (max-width: 405px){
    .v-image {
      .v-responsive__content {
        width: 200px !important;
      }
    }
  }
</style>
