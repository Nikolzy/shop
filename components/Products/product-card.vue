<template>
      <v-flex xs12 md6 lg6 col-xs-12 col-md-12 col-lg-6>
        <v-card class="card-item">
          <v-card-title>Укроп</v-card-title>
          <v-card-text class="d-flex flex-column align-center">
            <div class="d-flex justify-center">
              <v-img :src="imggg" style="max-width: 400px; width: 100%"></v-img>
            </div>
          </v-card-text>
          <v-card-subtitle class="card-subtitle">Властивості</v-card-subtitle>
          <v-card-text class="d-flex flex-column align-center">
            <div class="card-info">
              <div>Кріп має сечогінні та жовчогінні властивості, а також застосовується як засіб посилення секреції молока у годуючих матерів. А ще зелень кропу миттєво полегшує головний біль і допомагає впоратися з безсонням. Настій трави кропу знижує кров'яний тиск, розширює судини, розслаблює кишечник і збільшує діурез.</div><br>
            </div>
          </v-card-text>
          <v-card-actions class="actions">
            <v-text-field type="number" min="1"v-model="count"/>
            <v-btn v-if="!showMessage" color="green" @click="addToCart">Додати до кошику</v-btn>
            <v-btn v-else color="red" @click="removeFromCart">Видалити з кошика</v-btn>
          </v-card-actions>

          <v-alert v-if="showMessage" type="success">У кошику {{ count }}</v-alert>
        </v-card>
      </v-flex>
</template>

<script>
  import image from "@/static/product_images/ukrop.jpg"

  export default {
    props: {
      item: Object
    },
    name: 'product-card',
    data: () => ({
      count: 1,
      showMessage: false,
      imggg: image
    }),
    methods: {
      addToCart () {
        if (this.count >= 1) {
          this.showMessage = true;
        }
      },
      removeFromCart () {
        this.showMessage = false;
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
    }
  }

  @media screen and (max-width: 500px){
    .v-image {
      .v-responsive__content {
        width: 300px !important;
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
