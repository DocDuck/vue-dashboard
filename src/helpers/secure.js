/* eslint-disable */
import API from '@/helpers/api';

const secureUrl = function (url) {
    return new Promise((resolve, reject) => {
        API.get(url, {
            responseType: 'blob'
        })
            .then((response) => {
                const mimeType = response.headers['content-type'].toLowerCase();
                const newUrl = URL.createObjectURL(new Blob([response.data], {type: mimeType}));
                const re = /filename\*?=(?:utf-8'')?(?:"(.*?)"|(.*?))(?:$|;)/gi;
                const filename = decodeURIComponent(
                    response.headers['content-disposition'].match(re).reverse()
                        .map(v => {
                            let res = re.exec(v);
                            return res ? res.slice(1).find(v => typeof v !== 'undefined') : undefined;
                        })
                        .find(v => typeof v !== 'undefined')
                );
                resolve({newUrl, filename});
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export {
    secureUrl
}
