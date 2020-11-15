<template>
  <div class="chart">
    <PieChart :labels="orderNames" :data="orderCount"/>
  </div>
</template>

<script>
  import PieChart from '@/components/Charts/PieChart';
  import { mapGetters } from 'vuex';

  export default {
    layout: 'admin-layout',
    components: { PieChart },
    async mounted () {
      await this.$store.dispatch('admin/getOrderForStatistics');
    },
    computed: {
      ...mapGetters({
        orderNames: 'admin/getStatisticsOrderNames',
        orderCount: 'admin/getStatisticsOrderCount'
      })
    }
  }
</script>

<style scoped>
  .chart {
    margin: 20px auto;
  }
</style>
