<template>
  <div>
    <h1>Історія замовлень</h1>
    <history-card :orders="orders"/>
  </div>
</template>

<script>
import HistoryCard from '~/components/History/HistoryCard'
import { mapGetters } from 'vuex';

export default {
  name: 'History',
  components: { HistoryCard },
  computed: {
    ...mapGetters({
      cartItems: 'cart/getCartItems',
      orders: 'cart/getOrders'
    })
  },
}
</script>
