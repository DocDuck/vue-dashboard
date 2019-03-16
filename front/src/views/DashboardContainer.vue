<template>
 <div style="position: relative;">
     <bee-chart></bee-chart>
     <bee-panel></bee-panel>
 </div>
</template>

<script>
// helpers
import {mapState} from 'vuex'

// Компонты
import BeeChart from '@/components/BeeChart.vue'
import BeePanel from '@/components/BeePanel.vue'

export default {
  components: {
      BeeChart,
      BeePanel
  },
  data () {
    return {
      childComponents: ['TempVarChart.vue', 'Highlights.vue']
    }
  },
  methods: {

  },
  computed: {
    ...mapState(['finData'])
  }
}
</script>
