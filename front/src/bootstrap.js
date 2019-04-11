/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/* eslint-disable no-extend-native */
Date.prototype.format = function (format = 'dd.mm.yyyy') {
    let dd = this.getDate()
    let mm = this.getMonth() + 1
    let yyyy = this.getFullYear()
    let map = {
        'dd': String('0' + dd).slice(-2),
        'mm': String('0' + mm).slice(-2),
        'yyyy': yyyy
    }
    return format.replace(/dd|mm|yyyy/gi, function (matched) {
        return map[matched]
    })
}
