import API from './../api'

const geoCodeByAddress = function (address) {
    return API.post(process.env.GEO_SERVICE_ROOT + '/api/service/searchbyaddress', {address}, {
        id: '/api/service/searchbyaddress'
    })
}

let searchAddressTimeout = null
const searchAddress = function (queryString, MIN_SEARCH_LENGTH = 3) {
    return new Promise((resolve, reject) => {
        let searchResults = []
        if (typeof queryString === 'string' && queryString.length >= MIN_SEARCH_LENGTH) {
            clearTimeout(searchAddressTimeout)
            searchAddressTimeout = setTimeout(() => {
                loadSearchAddress({query: queryString})
                    .then((xhr) => {
                        searchResults = xhr.data.suggestions
                    })
                    .catch((e) => {
                        reject(e)
                    })
                    .finally(() => {
                        resolve(searchResults)
                    })
            }, 500)
        } else {
            resolve([])
        }
    })
}
const loadSearchAddress = function ({query}) {
    let params = {
        query: query,
        locations: [{kladr_id: 59}]
    }
    return API.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', params, {
        id: 'suggestions.dadata.ru',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token 194e6564fdfbeb90b76fc001583eba0ee0d0eb97'
        }
    })
}

export {
    geoCodeByAddress,
    searchAddress,
    loadSearchAddress
}

export default {
    geoCodeByAddress: geoCodeByAddress,
    searchAddress: searchAddress,
    loadSearchAddress: loadSearchAddress
}
