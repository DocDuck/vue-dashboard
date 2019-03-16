import Vue from 'vue'
import Vuex from 'vuex'
import API from '@/helpers/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    finData: [
        {
            date: "April 15th 2017",
            expense: 100,
            income: 4000
        },
        {
            date: "April 22nd 2017",
            expense: 500,
            income: 2000
        },
        {
            date: "April 24th 2017",
            expense: 1000,
            income: 2300
        },
        {
            date: "April 29th 2017",
            expense: 2000,
            income: 1234
        },
        {
            date: "May 1st 2017",
            expense: 500,
            income: 4180
        },
        {
            date: "May 5th 2017",
            expense: 4000,
            income: 5000
        },
    ],
    dataLoading: false,
    error: ''
  },
  mutations: {
    'finData': (state, {data}) => {
      state.finData = data
    },
    'dataLoading': (state, loading) => {
      state.dataLoading = loading
    },
    'error': (state, {data}) => {
        state.error = data
    }

  },
  actions: {
    'loadFinanceData': ({commit, getters, dispatch, state}) => {
      return new Promise((resolve, reject) => {
          commit('dataLoading', true)
          API.post('', {}, {
              id: ''
          })
              .then(xhr => {
                  let data = xhr.data
                  commit('finData', {data})
                  resolve(xhr)
              })
              .catch(error => {
                  commit('error', {error})
                  reject(error)
              })
              .finally(() => {
                  commit('dataLoading', false)
              })
      })
    }
  }
})
