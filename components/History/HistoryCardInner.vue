<template>
  <div>
    <v-card
      elevation="2"
      shaped
      class="history-card"
    >
      <v-card-text>
        <p class="history-card-title">Замовлення #{{ index + 1 }}</p>
        <div v-for="el in formattedOrder" class="history-card-info">
          <div v-if="el.count"><span>{{ el.title }}</span> x <span>{{ el.count }}</span></div>
        </div>
        <div class="order_price">
          Ціна: <b>{{ price }}</b> грн.
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default  {
  name: 'HistoryCardInner',
  props: {
    formattedOrder: {
      type: Array,
      required: true,
      default: []
    },
    index: {
      type: Number,
      required: true
    },
    price: Number
  }
}
</script>

<style scoped>
.history-card-title {
  font-size: 20px;
  font-weight: bold;
}
.history-card-info {
  font-size: 13px;
  line-height: 1.3;
}
.order_price {
  margin-top: 20px;
}
</style>
