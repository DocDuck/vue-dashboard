'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    BEELINE_PLATFORM: 'skynet',
    APP_TITLE: '"Статистика Skynet"'
})
