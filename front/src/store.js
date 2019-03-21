import Vue from 'vue'
import Vuex from 'vuex'
import API from '@/helpers/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tableData: [{
            date: 'Jan 2017',
            rooms: [{
                name: 'Room A',
                attending: 10,
                interested: 5
            }, {
                name: 'Room B',
                attending: 5,
                interested: 10
            }]
        }, {
            date: 'Feb 2017',
            rooms: [{
                name: 'Room A',
                attending: 0,
                interested: 5
            }, {
                name: 'Room B',
                attending: 5,
                interested: 15
            }]
        }, {
            date: 'Mar 2017',
            rooms: [{
                name: 'Room B',
                attending: 5
            }]
        }],
        dataLoading: false,
        error: ''
    },
    mutations: {
        'tableData': (state, {data}) => {
            state.tableData = data
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
                        commit('tableData', {data})
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
