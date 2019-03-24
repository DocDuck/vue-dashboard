<template>
 <div class="content">
     <bee-chart :chartData="dataToChart(tableData)"></bee-chart>
     <bee-tabs></bee-tabs>
     <bee-table :tableData="tableData"
                :unic-fin-dates="unicFinDates"></bee-table>
 </div>
</template>

<script>
// helpers
import {formatDate} from '@/helpers/format'
import {mapState} from 'vuex'

// Компонты
import BeeChart from '@/components/BeeChart.vue'
import BeeTabs from '@/components/BeeTabs.vue'
import BeeTable from '@/components/BeeTable.vue'

export default {
  components: {
      BeeChart,
      BeeTabs,
      BeeTable
  },
  data () {
    return {}
  },
  methods: {
      formatDate,
      dataToChart (tableData) {
          let chartTemplate = {}
          chartTemplate.labels = this.unicFinDates
          chartTemplate.datasets = []
          tableData.forEach( (service, key) => {
              let dataset = {}
              dataset.data = []
              chartTemplate.datasets[key] = dataset
              dataset.label = service.name
              service.finEvents.forEach(finEvent => {
                  dataset.data.push(finEvent.attending)
              })
              dataset.borderWidth = 1
              chartTemplate.datasets.push(dataset)
              }
          )
          return chartTemplate
      }
  },
  computed: {
    ...mapState(['tableData', 'fishData']),
      // возвращает массив с уникальными датами финансовых событий, отсортированный по возрастанию и приведенный к виду dd.mm.yyyy
      unicFinDates () {
          let finEventDates = {}
          let formatDates = []
          this.tableData.forEach(row => {
              row.finEvents.forEach(finEvent => {
                  finEventDates[finEvent.date] = 1
              })
          })
          let sortedDates = Object.keys(finEventDates).sort(function(a, b){
              let dateA = Date.parse(a), dateB = Date.parse(b)
              return dateA - dateB //сортировка по возрастающей дате
          })
          sortedDates.forEach( (date) => {formatDates.push( this.formatDate(date) )})
          return formatDates
      }

  }
}
</script>
