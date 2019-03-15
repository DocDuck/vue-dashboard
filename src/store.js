import Vue from 'vue'
import Vuex from 'vuex'
import API from '@/helpers/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    weather_data: {
      location: "California",
      temperature: {
        tempToday: [
          {hour: '11.00 AM', temp: '35'},
          {hour: '12.00 PM', temp: '36'},
          {hour: '1.00 PM', temp: '37'},
          {hour: '2.00 PM', temp: '38'},
          {hour: '3.00 PM', temp: '36'},
          {hour: '4.00 PM', temp: '35'},
        ],
      },
      highlights: {
        uvIndex: 4,
        visibility: 10,
        windStatus: {
          windSpeed: '30 km/h',
          windDirection: '30',
          derivedWindDirection: 'NNE',
        },
      },
    },
    weatherLoading: false 
  },
  mutations: {
    'weatherData': (state, {data}) => {
      state.weather_data = data
    },
    'weatherLoading': (state, loading) => {
      state.weatherLoading = loading
    }

  },
  actions: {
    'loadWeatherData': ({commit, getters, dispatch, state}) => {
      return new Promise((resolve, reject) => {
          commit('weatherLoading', true)
          API.post('', {}, {
              id: ''
          })
              .then(xhr => {
                  let data = xhr.data
                  commit('weatherData', {data})
                  resolve(xhr)
              })
              .catch(error => {
                  commit('error', {error})
                  reject(error)
              })
              .finally(() => {
                  commit('weatherLoading', false)
              })
      })
    }
  }
})
