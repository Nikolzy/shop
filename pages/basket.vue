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
    <div>
      <v-btn color="green" @click="confirmOrder">Замовити</v-btn>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/Products/product-card';

export default {
  name: 'basket',
  components: { ProductCard },
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
