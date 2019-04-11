const DEFAULT_YEAR_ID = new Date().getFullYear() // текущий год
const DEFAULT_AREA_ID = 41 // г. Пермь
const DEFAULT_DISTRICT_ID = 0 // район не выбираем

const isEmpty = (mixed) => (typeof mixed === 'object' && mixed !== null ? Object.keys(mixed).length === 0 : !!mixed === false)

const uniqueArray = (array) => (array.filter(function (item, pos, self) {
    return self.indexOf(item) === pos
}))

const emptyFill = function (data, rule) {
    if (typeof rule === 'string') {
        switch (rule) {
            case 'email':
                return data ? '<a href="mailto:' + data + '">' + data + '</a>' : '-----'
        }
    }
    if (typeof data === 'object') {
        if (data instanceof Date) {
            return data.getFullYear() > 1970 ? data.format() : '-----'
        }
    }
    return !data ? '-----' : data
}

const roundFloat = function (value) {
    let val = parseFloat(value)
    if (isNaN(val)) {
        return null
    }
    if (Number.isInteger(val)) {
        val = parseInt(val)
    } else {
        val = val.toFixed(2)
    }
    return val
}

const wordWrap = (s, w, b = '\n') => {
    return s.replace(
        new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, 'g'), '$1' + b
    )
}

const truncString = (s, l, b = '...') => {
    return s.substring(0, l) + (s.length > l ? b : '')
}

function nl2br (str, isXhtml) {
    if (typeof str === 'undefined' || str === null) {
        return ''
    }
    var breakTag = (isXhtml || typeof isXhtml === 'undefined') ? '<br />' : '<br>'
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2')
}

const parseUrl = function (url) {
    let l = document.createElement('a')
    l.href = url
    let proto = l.href.match(/^([a-z]+):\/\//i)
    proto = proto === null ? null : proto[1]
    let parsed = {
        protocol: proto,
        hostname: l.hostname,
        url: l.href,
        base: `${proto}://${l.hostname}`
    }
    l.remove()
    return parsed
}

const fileSizeIEC = function (a, b, c, d, e) {
    let size = (b = Math, c = b.log, d = 1024, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(2) + ' ' + (e ? 'KMGTPEZY'[--e] + 'B' : 'Bytes')
    return size
}

export {
    DEFAULT_YEAR_ID,
    DEFAULT_AREA_ID,
    DEFAULT_DISTRICT_ID,
    isEmpty,
    roundFloat,
    uniqueArray,
    emptyFill,
    wordWrap,
    truncString,
    nl2br,
    parseUrl,
    fileSizeIEC
}

export default {
    DEFAULT_YEAR: DEFAULT_YEAR_ID,
    DEFAULT_AREA_ID: DEFAULT_AREA_ID,
    DEFAULT_DISTRICT_ID: DEFAULT_DISTRICT_ID,
    isEmpty: isEmpty,
    roundFloat: roundFloat,
    uniqueArray: uniqueArray,
    emptyFill: emptyFill,
    wordWrap: wordWrap,
    truncString: truncString,
    nl2br: nl2br,
    parseUrl: parseUrl,
    fileSizeIEC: fileSizeIEC
}
