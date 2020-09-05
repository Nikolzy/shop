<template>
  <div>
    <h1>Товари</h1>
    <div class="d-flex flex-wrap">
      <product-card v-for="i in 5"/>
    </div>
  </div>
</template>

<script>
  import ProductCard from '../components/Products/product-card'
  export default  {
    name: 'products',
    components: { ProductCard }
  }
</script>
