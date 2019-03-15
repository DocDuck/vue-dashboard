const formatMoney = function (amount, decimalCount = 2, decimal = ',', thousands = ' ') {
    try {
        decimalCount = Math.abs(decimalCount)
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount

        const negativeSign = amount < 0 ? '-' : ''

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
        let j = (i.length > 3) ? i.length % 3 : 0

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '')
    } catch (e) {
        console.log(e)
    }
}

const formatDate = function (date, format = 'dd.mm.yyyy') {
    return date ? new Date(date).format() : ''
}

const formatPeriod = function (start, end) {
    if (start || end) {
        return (formatDate(start) || '?') + ' — ' + (formatDate(end) || '?')
    }
    return ''
}

export {
    formatMoney,
    formatDate,
    formatPeriod
}

export default {
    formatMoney: formatMoney,
    formatDate: formatDate,
    formatPeriod: formatPeriod
}
