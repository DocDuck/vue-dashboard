import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
      }
    }  
  },
  mutations: {

  },
  actions: {

  }
})
