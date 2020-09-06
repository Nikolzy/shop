<template>
      <v-flex v-if="showCard" xs12 md6 lg6 col-xs-12 col-md-12 col-lg-6>
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
          <v-card-actions class="actions d-flex flex-wrap">
            <div>
              <b>{{ item.price }} грн</b> / 100г
            </div>
            <div class="d-flex align-center">
              <v-text-field v-model="count" :disabled="showMessage && type === 'shop'" type="number" min="1"/>
              <v-btn v-if="!showMessage" color="green" @click="addToCart">До кошику</v-btn>
              <v-btn v-else color="red" @click="removeFromCart"><v-icon>mdi-delete</v-icon></v-btn>
            </div>
          </v-card-actions>
          <v-alert v-if="showMessage && type === 'shop'" type="success">У кошику {{ count }}</v-alert>
        </v-card>
      </v-flex>
</template>

<script>
  export default {
    props: {
      item: Object,
      type: String,
      updateComponent: Function
    },
    name: 'product-card',
    data: () => ({
      showMessage: false,
      count: 0
    }),
    mounted() {
      this.showMessage = !!(this.item.count && this.item.status === 'added');
      this.count = this.item.count;
    },
    computed: {
      showCard() {
        return this.type === 'shop' || (this.type === 'basket' && this.item.status === 'added');
      }
    },
    watch: {
      'count': {
        immediate: false,
        handler (value) {
          if (this.type === 'basket' && +value && this.item.status === 'added') {
            this.$store.commit('cart/updateProductsAmount', {
              id: this.item.id,
              count: this.count,
              price: this.item.price
            });
          }
        }
      }
    },
    methods: {
      addToCart () {
        if (this.count >= 1) {
          this.showMessage = true;
          this.$store.commit('cart/updateProductsAmount', {
            id: this.item.id,
            count: this.count,
            price: this.item.price
          });
          this.$store.commit('cart/updateProducts', {
            id: this.item.id,
            count: this.count,
            status: 'added'
          });
        }
      },
      removeFromCart () {
        this.showMessage = false;
        this.$store.commit('cart/updateProductsAmount', {
          id: this.item.id,
          count: 0,
          price: this.item.price
        });
        this.$store.commit('cart/updateProducts', {
          id: this.item.id,
          count: 1,
          status: 'removed'
        });
        if (this.type === 'basket') {
          this.updateComponent();
        }
      }
    }
  }
</script>

<style lang="scss">
  .actions {
    display: flex;
    justify-content: space-between;
    .v-input {
      max-width: 50px;
      min-width: 30px;
      margin-right: 10px;
      margin-left: 5px;
    }
  }
  .card-item {
    .v-image {
      .v-responsive__content {
        width: 400px !important;
        height: 300px;
        transition: all .3s linear;
      }
    }
  }
  .card-subtitle {
    font-weight: bold;
    margin: 0;
  }
  .card-info {
    width: 100%;
    //min-height: 200px;
  }

  @media screen and (max-width: 500px){
    .card-item {
      .v-image {
        .v-responsive__content {
          width: 300px !important;
          height: auto !important;
        }
      }
    }
    .actions {
      flex-direction: column;
      align-items: flex-end;
      padding-right: 20px;
    }
  }
  @media screen and (max-width: 405px){
    .card-item {
      .v-image {
        .v-responsive__content {
          width: 200px !important;
        }
      }
    }
  }
</style>
