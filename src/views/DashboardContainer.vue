<template>
 <div style="position: relative;">
    <temp-var-chart :tempVar="weather_data.temperature"></temp-var-chart>
    <today-highlights :highlights="weather_data.highlights"></today-highlights>
 </div>
</template>

<script>
// helpers
import {mapState} from 'vuex'

// Компонты
import TempVarChart from '@/components/TempVarChart.vue'
import Highlights from '@/components/Highlights.vue'

export default {
  components: {
    'temp-var-chart': TempVarChart,
    'today-highlights': Highlights
  },
  data () {
    return {
      childComponents: ['TempVarChart.vue', 'Highlights.vue']
    }
  },
  methods: {

  },
  computed: {
    ...mapState(['weather_data'])
  }
}
</script>
