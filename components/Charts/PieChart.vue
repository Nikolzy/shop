<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: {
    labels: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      options: {
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      },
      chartData: {
        labels: this.labels,
        datasets: [{
          borderWidth: 1,
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(21, 86, 177, 1)',
            'rgba(78, 41, 157, 1)',
            'rgba(189, 50, 224, 1)',
            'rgba(52, 8, 11, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(14, 214, 0, 1)',
            'rgba(226, 247, 2, 1)'
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(21, 86, 177, 0.2)',
            'rgba(78, 41, 157, 0.2)',
            'rgba(189, 50, 224, 0.2)',
            'rgba(52, 8, 11, 0.2)',
            'rgba(0, 0, 0, 0.2)',
            'rgba(14, 214, 0, 0.2)',
            'rgba(226, 247, 2, 0.2)'
          ],
          data: this.data
        }]
      },
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
}
</script>
