<template>
  <div>
    <h1>Кошик</h1>
    <div v-if="price">До сплати: <b>{{ price }}</b> грн</div>
    <v-alert v-else type="warning">
      Ваш кошик порожній.
    </v-alert>
    <div class="d-flex flex-wrap" :key="updated">
      <product-card
        v-for="item in products"
        :key="item.id"
        :item="item"
        :updateComponent="updateComponent"
        type="basket"
      />
    </div>
    <v-alert v-if="price && !isUserValid" type="warning" class="d-flex">
      <div class="mr-2 mb-2">Для того, щоб оформити замовлення, необхідно заповнити дані в профілі.</div>
      <v-btn
        @click="$router.push('/profile')"
        color="green"
        dark
      >
        Перейти
      </v-btn>
    </v-alert>
    <div v-if="price && isUserValid">
      <pop-confirm-button
        button-color="green"
        button-label="Замовити"
        type="text"
        :disabled="true"
        :message="message"
        :action="confirmOrder"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/Products/product-card';
import PopConfirmButton from '@/components/common/PopConfirmButton'

export default {
  name: 'basket',
  components: { PopConfirmButton, ProductCard },
  data: () => ({
    price: 0,
    updated: false
  }),
  mounted() {
    this.calculatePrice();
  },
  computed: {
    cartItems() {
      return this.$store.getters['cart/getCartItems'];
    },
    products() {
      return this.$store.getters['cart/getProducts'];
    },
    productsAmount() {
      return this.$store.getters['cart/getProductsAmount'];
    },
    message() {
      return 'Ви підтверджуєте замовлення?';
    },
    isUserValid() {
      return this.$store.getters['user/getUserValid'];
    }
  },
  watch: {
    productsAmount() {
      this.calculatePrice();
    },
  },
  methods: {
    calculatePrice() {
      let prices = [];
      for (let key in this.cartItems) {
        const { price, count } = this.cartItems[key];
        prices.push(price * count);
      }
      if (prices.length) {
        this.price = prices.reduce((a,b) => a + b);
      }
    },
    updateComponent() {
      this.updated = !this.updated;
    },
    confirmOrder() {
      console.log('confirm')
    }
  }
}
</script>

<style lang="scss">
</style>
