import Vue from 'vue'
import Vuex from 'vuex'
import API from '@/helpers/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        fishData: {
            labels: ["tableData[0].finEvents[0]", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [
                {
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                },
                {
                    label: '# of Points',
                    data: [7, 11, 5, 8, 3, 7],
                    borderWidth: 1
                }
            ]
        },
        tableData: [{
            name: 'Сервис 1',
            finEvents: [{
                date: '2018-01-20',
                attending: 77,
                interested: 5
            }, {
                date: '2018-01-23',
                attending: 666,
                interested: 10
            }]
        }, {
            name: 'Сервис 2',
            finEvents: [{
                date: '2018-01-18',
                attending: 5555,
                interested: 5
            },
            {
                date: '2018-04-20',
                attending: 600,
                interested: 1500
            }]
        }, {
            name: 'Сервис 3',
            finEvents: [{
                date: '2018-01-18',
                attending: 123,
                interested: 5
            },
            {
                date: '2018-04-20',
                attending: 600,
                interested: 1500
            },{
                date: '2018-01-24',
                attending: 5555,
                interested: 5
            },
            {
                date: '2018-04-26',
                attending: 44,
                interested: 1500
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
                API.all('api', {}, {
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
