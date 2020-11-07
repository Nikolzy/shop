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
      await this.$store.dispatch('admin/getOrderForStatics');
      this.createChartData();
    },
    computed: {
      ...mapGetters({
        orderNames: 'admin/getStaticsOrderNames',
        orderCount: 'admin/getStaticsOrderCount'
      })
    },
    methods: {
      createChartData () {
        // console.log(this.usersInfo)
      }
    }
  }
</script>

<style scoped>
  .chart {
    margin: 20px auto;
  }
</style>
