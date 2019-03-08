<template>
  <div>
    <p>This child components of Content.vue are:</p>
    <ul>
      <li :key="childComponent" v-for="childComponent in childComponents">{{ childComponent }}</li>
    </ul>
    <code>{{weather_data}}</code>
  </div>
</template>

<script>
// helpers
import {mapState} from 'vuex'

// модули
// import store from '@/store'

export default {
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
