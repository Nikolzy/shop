<template>
  <div>
    <h1>Товари</h1>
    <div class="d-flex flex-wrap">
      <product-card
        v-for="item in products"
        :key="item.id"
        :item="item"
        type="shop"
      />
    </div>
  </div>
</template>

<script>
  import ProductCard from '../components/Products/ProductCard'

  export default  {
    name: 'products',
    components: { ProductCard },
    data: () => ({}),
    computed: {
      products() {
        return this.$store.getters['cart/getProducts'];
      }
    }
  }
</script>
