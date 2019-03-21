<template>
 <div class="content">
     <bee-chart class="chart"></bee-chart>
     <div class="panel">
         <bee-tabs></bee-tabs>
         <bee-table :tableData="tableData"></bee-table>
     </div>
 </div>
</template>

<script>
// helpers
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

  },
  computed: {
    ...mapState(['tableData'])
  }
}
</script>
