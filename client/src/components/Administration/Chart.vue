<template>
  <Bar v-if="loaded"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'Chart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 50
    },
    height: {
      type: Number,
      default: 50
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    },
    informations: Array,
    informationsPlus: Array,
    months: Array,
    infoName: String,
    infoNamePlus: String,
  },
  data() {
    return {
      loaded: false,
      chartData: {},
      chartOptions: {
        responsive: true
      },
    }
  },
  mounted () {

    try {
      if (this.infoNamePlus) {
        this.chartData = {
          labels: this.months,
          datasets: [ { data: this.informations, backgroundColor: '#226d53', label: this.infoName }, { data: this.informationsPlus, backgroundColor: '#5e9f88', label: this.infoNamePlus } ]
        }
      } else {
        this.chartData = {
          labels: this.months,
          datasets: [ { data: this.informations, backgroundColor: '#226d53', label: this.infoName } ]
        }
      }

      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
