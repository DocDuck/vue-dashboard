<template>
  <div>
    <p>This child components of Content.vue are:</p>
    <ul>
      <li :key="childComponent" v-for="childComponent in childComponents">{{ childComponent }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      childComponents: ['TempVarChart.vue', 'Highlights.vue'],
      weather_data: {
        location: "Perm",
        temperature: {
          current: "5 C",
        },
        highlights: {
          uvindex: "1",
          windstatus: {
            speed: "10 km/h",
            direction: "N-E",
          },
          visibility: "12 km",
        },
      },
    }
  },
  methods: {

  },
  computed: {

  },
}
</script>
