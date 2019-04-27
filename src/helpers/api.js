import axios from 'axios'
import store from '@/store'

let CancelToken = axios.CancelToken
let cancelStack = {}

const AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_ROOT,
    timeout: 20000,
    maxContentLength: 20000
})

const API = {
    ...AxiosInstance,

    // Отмена запроса по ID или всех (при пустом ID)
    cancel (id) {
        if (id) {
            let cancel = (cancelStack[id] && cancelStack[id]('abort'))
            delete cancelStack[id]
            return cancel
        }

        for (let i in cancelStack) {
            cancelStack[i]('abort')
        }

        cancelStack = {}
        return true
    }
}

// добавление обработки отмены запроса
API.interceptors.request.use(function (config) {
    if (config.id) {
        if (!config.hasOwnProperty('cancellable')) {
            config.cancellable = true
        }
        if (!config.hasOwnProperty('authenticable')) {
            config.authenticable = true
        }
        if (config.cancellable === true) {
            API.cancel(config.id)
        }
        config.cancelToken = new CancelToken((cancel) => {
            cancelStack[config.id] = cancel
        })
    }

    return config
}, function (error) {
    return Promise.reject(error)
})

// добавление обработки ошибочного статуса ответа
API.interceptors.response.use(response => response, error => {
    if (error instanceof axios.Cancel) {
        return Promise.reject(error)
    }

    const { status } = error.response

    // ошибка не аутентифицированного пользователя
    if (status === 401 && error.response.config.authenticable) {
        store.dispatch('auth/REDIRECT_TO_LOGIN')
    }

    return Promise.reject(error)
})

export default API
