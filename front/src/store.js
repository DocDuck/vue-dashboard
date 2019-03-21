import Vue from 'vue'
import Vuex from 'vuex'
import API from '@/helpers/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        finData: [
            {
                serviceName: 'Сервис 1',
                stats: [
                {
                    date: "18.01.18",
                    expense: 100,
                    income: 4000
                },
                {
                    date: "18.01.18",
                    expense: 100,
                    income: 4000
                },
                {
                    date: "18.01.18",
                    expense: 100,
                    income: 4000
                },
                {
                    date: "18.01.18",
                    expense: 100,
                    income: 4000
                },
                {
                    date: "18.01.18",
                    expense: 100,
                    income: 4000
                },
                {
                    date: "18.01.18",
                    expense: 100,
                    income: 4000
                }
                ]
            },
            {
                serviceName: 'Сервис 2',
                stats: [
                    {
                        date: "18.01.18",
                        expense: 100,
                        income: 4000
                    },
                    {
                        date: "18.01.18",
                        expense: 100,
                        income: 4000
                    },
                    {
                        date: "18.01.18",
                        expense: 100,
                        income: 4000
                    },
                    {
                        date: "18.01.18",
                        expense: 100,
                        income: 4000
                    },
                    {
                        date: "18.01.18",
                        expense: 100,
                        income: 4000
                    },
                    {
                        date: "18.01.18",
                        expense: 100,
                        income: 4000
                    }
                ]
            },
            {
                serviceName: 'Сервис 3',
                stats: [
                    {
                        date: "18.01.18",
                        expense: 100,
                        income: 4000
                    },
                    {
                        date: "18.01.18",
                        expense: 100,
                        income: 4000
                    },
                    {
                        date: "18.01.18",
                        expense: 100,
                        income: 4000
                    },
                    {
                        date: "18.01.18",
                        expense: 100,
                        income: 4000
                    },
                    {
                        date: "18.01.18",
                        expense: 100,
                        income: 4000
                    },
                    {
                        date: "18.01.18",
                        expense: 100,
                        income: 4000
                    }
                ]
            },
            {
                serviceName: 'Сервис 4',
                stats: [
                    {
                        date: "18.01.18",
                        expense: 100,
                        income: 4000
                    },
                    {
                        date: "18.01.18",
                        expense: 100,
                        income: 4000
                    },
                    {
                        date: "18.01.18",
                        expense: 100,
                        income: 4000
                    },
                    {
                        date: "18.01.18",
                        expense: 100,
                        income: 4000
                    },
                    {
                        date: "18.01.18",
                        expense: 100,
                        income: 4000
                    },
                    {
                        date: "18.01.18",
                        expense: 100,
                        income: 4000
                    }
                ]
            }
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
