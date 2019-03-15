import {wordWrap, truncString} from '@/helpers/common'
import {CATEGORY_ROAD} from '@/helpers/logic'

const getObjectFeatures = function (data) {
    if (!data || !data.geo_type || !data.geo_polygon) {
        return []
    }

    let features = []

    function getFeature (id, geometry) {
        // disable reactivity
        geometry.coordinates = JSON.parse(JSON.stringify(geometry.coordinates))
        const color = data.category_color

        return {
            type: 'Feature',
            id,
            geometry,
            properties: {
                id,
                objectId: data.object_key,
                categoryId: data.category_key,
                categorySlug: data.category_slug,
                className: 'bkg-categories_' + (data.is_signed === 0 ? 'unsigned' : data.category_slug),
                hintContent: (data.category_name ? data.category_name + '<br>' : '') + wordWrap(truncString(data.object_name, 200, '...'), 50, '<br>')
            },
            options: {
                iconLayout: 'my#placemark-small-selected',
                iconOffset: [-10, -10],
                iconShape: {
                    type: 'Rectangle',
                    coordinates: [[-10, -10], [10, 10]]
                },
                fillColor: color,
                fillOpacity: 0.5,
                strokeColor: color,
                strokeWidth: 2,
                strokeOpacity: 0.45
            }
        }
    }

    let geometry = {}
    let visibleIcon = ![CATEGORY_ROAD].includes(data.category_key)

    switch (data.geo_type) {
        case 'point':
            geometry = {
                type: 'Point',
                coordinates: data.geo_polygon
            }
            features.push(getFeature('pt' + data.object_key, geometry))
            break
        case 'polygon':
            if (visibleIcon) {
                geometry = {
                    type: 'Point',
                    coordinates: data.geo_center
                }
                features.push(getFeature('pt' + data.object_key, geometry))
            }
            geometry = {
                type: 'Polygon',
                coordinates: data.geo_polygon
            }
            // id всех полигонов начинается с индекса 0
            features.push(getFeature('pg' + data.object_key + '.0', geometry))
            break
        case 'multipolygon':
            if (visibleIcon) {
                geometry = {
                    type: 'Point',
                    coordinates: data.geo_center
                }
                features.push(getFeature('pt' + data.object_key, geometry))
            }
            for (let i in data.geo_polygon) {
                // id всех полигонов начинается с индекса 0
                features.push(getFeature('pg' + data.object_key + '.' + i, {
                    type: 'Polygon',
                    coordinates: data.geo_polygon[i]
                }))
            }
            break
        case 'multilinestring':
            if (visibleIcon) {
                geometry = {
                    type: 'Point',
                    coordinates: data.geo_center
                }
                features.push(getFeature('pt' + data.object_key, geometry))
            }
            for (let i in data.geo_polygon) {
                // id всех линий начинается с индекса 0
                features.push(getFeature('ln' + data.object_key + '.' + i, {
                    type: 'LineString',
                    coordinates: data.geo_polygon[i]
                }))
            }
            break
    }

    return features
}

const getWorkFeatures = function (data) {
    if (!data || !data.geo) {
        return []
    }

    return data.geo.map((geo, index) => {
        let options = {}
        switch (geo.type) {
            case 'Point':
                options = {
                    preset: 'islands#blackCircleDotIcon',
                    balloonShadow: false,
                    hideIconOnBalloonOpen: false,
                    // Запретим замену обычного балуна на балун-панель.
                    // Если не указывать эту опцию, на картах маленького размера откроется балун-панель.
                    balloonPanelMaxMapArea: 0
                }
                break
            case 'Polygon':
            case 'MultiPolygon':
                options = {
                    strokeColor: '#000000',
                    strokeOpacity: 0.8,
                    strokeWidth: 2,
                    fillColor: '#000000',
                    fillOpacity: 0.15
                }
                break
            default:
                options = {
                    strokeColor: '#000000',
                    strokeOpacity: 0.8,
                    strokeWidth: 2
                }
        }

        return {
            type: 'Feature',
            id: data.guid + index,
            geometry: JSON.parse(JSON.stringify(geo)),
            options
        }
    })
}

export {
    getObjectFeatures,
    getWorkFeatures
}

export default {
    getObjectFeatures,
    getWorkFeatures
}
