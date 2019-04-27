import Vue from 'vue'
import Vuex from 'vuex'
import API from '@/helpers/api'
import {isEmpty} from '@/helpers/common'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        exampleData: [
            {
                "service_id": "123",
                "in_requests": 100,
                "from_gsm_ip": 90,
                "subs_attempt": 80,
                "subs_error": 10,
                "subs_ok": 70
            },
            {
                "service_id": "1343234",
                "in_requests": 100,
                "from_gsm_ip": 20,
                "subs_attempt": 66,
                "subs_error": 44,
                "subs_ok": 11
            },
        ],
        apiServicesData: [],
        apiPartnersData: [],
        chosenDateInterval: {},
        dataLoading: false,
        error: ''
    },
    mutations: {
        'apiServicesData': (state, {data}) => {
            state.apiServicesData = data
        },
        'apiPartnersData': (state, {data}) => {
            state.apiPartnersData = data
        },
        'dataLoading': (state, loading) => {
            state.dataLoading = loading
        },
        'error': (state, {data}) => {
            state.error = data
        }

    },
    actions: {
        'loadServicesData': ({commit, getters, dispatch, state}, dates) => {
            if (!isEmpty(dates.start_date) && !isEmpty(dates.end_date)) { dates = `?from=${dates.start_date}&to=${dates.end_date}`}
            else dates = ''

            return new Promise((resolve, reject) => {
                commit('dataLoading', true)
                API.get(`/beeline/${process.env.VUE_APP_BEELINE_PLATFORM}/services` + dates)
                .then(xhr => {
                        let data = xhr.data.data
                        commit('apiServicesData', {data})
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
        },
        'loadPartnersData': ({commit, getters, dispatch, state}, dates) => {
            if (!isEmpty(dates.start_date) && !isEmpty(dates.end_date)) { dates = `?from=${dates.start_date}&to=${dates.end_date}`}
            else dates = ''

            return new Promise((resolve, reject) => {
                commit('dataLoading', true)
                API.get('/beeline/smx/partners' + dates)
                    .then(xhr => {
                        let data = xhr.data.data
                        commit('apiPartnersData', {data})
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
