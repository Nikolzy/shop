<template>
  <div class="history-card-wrapper" v-if="formattedOrders.length">
    <HistoryCardInner
      v-for="(order, i) in formattedOrders"
      :formatted-order="order"
      :index="i"
      class="history-card"
    />
  </div>
</template>

<script>

import HistoryCardInner from '@/components/History/HistoryCardInner'
export default  {
  name: 'HistoryCard',
  components: { HistoryCardInner },
  props: {
    orders: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    formattedOrders: []
  }),
  mounted() {
    this.formatData();
  },
  watch: {
    orders: {
      deep: true,
      handler () {
        this.formatData();;
      }
    }
  },
  methods: {
    formatData () {
      this.formattedOrders = this.orders.map(el => Object.entries(el).map(e => e[1]))
    }
  }
}
</script>

<style scoped>
  .history-card-wrapper {
    margin-top: 30px;
  }
  .history-card {
    margin-top: 25px;
    max-width: 700px;
  }
</style>
