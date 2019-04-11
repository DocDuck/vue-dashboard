const getImage = (file) => {
    return new Promise((resolve, reject) => {
        const fReader = new FileReader()
        const img = document.createElement('img')

        fReader.onload = () => {
            img.src = fReader.result
            resolve(this.getBase64Image(img))
        }

        fReader.readAsDataURL(file)
    })
}

const getBase64Image = (img) => {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height

    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    const dataURL = img.src
    return dataURL
}

const getFileFromXhr = function (response) {
    const mimeType = response.headers['content-type'].toLowerCase()
    const url = URL.createObjectURL(new Blob([response.data], {type: mimeType}))
    const link = document.createElement('a')
    link.href = url

    const re = /filename\*?=(?:utf-8'')?(?:"(.*?)"|(.*?))(?:$|;)/gi
    const filename = decodeURIComponent(
        response.headers['content-disposition'].match(re).reverse()
            .map(v => {
                let res = re.exec(v)
                return res ? res.slice(1).find(v => typeof v !== 'undefined') : undefined
            })
            .find(v => typeof v !== 'undefined')
    )
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(url)
    document.body.removeChild(link)
}

export {
    getImage,
    getBase64Image,
    getFileFromXhr
}

export default {
    getImage,
    getBase64Image,
    getFileFromXhr
}
