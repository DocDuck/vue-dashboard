'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
    WEB_ROOT: 'http://***',
    API_ROOT: 'http://***/api',
    GEO_SERVICE_ROOT: 'http://***',
    GET_TOKEN_URL: 'http://***/oauth/token',

    LOGIN_URL: 'http://localhost:8001/login',
    MODULE_NTO_URL: 'http://localhost:8002',
    MODULE_RK_URL: 'http://localhost:8002'
})
