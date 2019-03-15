const Ymap = {
    init: (config) => new Promise((resolve, reject) => {
        const defaultOptions = {
            center: [56.229398, 58.024384],
            zoom: 16,
            controls: [],
            behaviors: ['drag', 'scrollZoom']
        }

        window.ymaps.ready(() => {
            const map = new window.ymaps.Map(config.id, Object.assign(defaultOptions, config))
            map.options.set('maxZoom', 20)
            map.options.set('minZoom', 10)
            map.options.set('suppressMapOpenBlock', true)
            map.options.set('yandexMapDisablePoiInteractivity', true)

            // заносим в хранилище кастомные иконки
            const factory = window.ymaps.templateLayoutFactory
            const storage = window.ymaps.layout.storage

            // точка определения геометрии
            if (!storage.isDefined('select#placemark')) {
                const selectPM = factory.createClass(PMSelect.template, PMSelect.config)
                storage.add('select#placemark', selectPM)
            }
            if (!storage.isDefined('select#baloon')) {
                const selectPMBaloon = factory.createClass(PMSelectBalloonLayout.template, PMSelectBalloonLayout.config)
                storage.add('select#baloon', selectPMBaloon)
            }
            if (!storage.isDefined('select#baloon-content')) {
                const selectPMBaloonContent = factory.createClass(PMSelectBalloonContentLayout.template, PMSelectBalloonContentLayout.config)
                storage.add('select#baloon-content', selectPMBaloonContent)
            }

            if (!storage.isDefined('my#clusterer')) {
                const defaultCL = factory.createClass(clustererDefault.template, clustererDefault.config)
                storage.add('my#clusterer', defaultCL)
            }

            if (!storage.isDefined('my#placemark-small')) {
                const smallPM = factory.createClass(placeMarkSmall.template, placeMarkSmall.config)
                storage.add('my#placemark-small', smallPM)
            }

            if (!storage.isDefined('my#placemark-small-selected')) {
                const smallPMSelected = factory.createClass(placeMarkSmallSelected.template, placeMarkSmallSelected.config)
                storage.add('my#placemark-small-selected', smallPMSelected)
            }

            if (!storage.isDefined('my#block-placemark')) {
                const blockPM = factory.createClass(placeMarkBlock.template, placeMarkBlock.config)
                storage.add('my#block-placemark', blockPM)
            }

            resolve({map})
        })
    })
}

const PMSelect = {
    template: `
        <div class="ico_obj">
            <div class="ico-map ico_obj_select"></div>
        </div>
        `,
    config: {}
    // config: {
    //     build: function () {
    //         this.constructor.superclass.build.call(this)
    //
    //         this._events = window.ymaps.domEvent.manager.group(this.getElement())
    //         this._events.add('click', function () {
    //             alert('1')
    //         })
    //     },
    //
    //     clear: function () {
    //         this._events.removeAll()
    //         this.constructor.superclass.clear.call(this)
    //     }
    // }
}

const PMSelectBalloonLayout = {
    template: `
        <div class="select-baloon-right">
            <div class="select-baloon-inner">
                $[[options.contentLayout observeSize minWidth=197 maxWidth=197 maxHeight=350]]
            </div>
        </div>
        `,
    config: {
        build: function () {
            this.constructor.superclass.build.call(this)
        },
        clear: function () {
            this.constructor.superclass.clear.call(this)
        }
    }
}

const PMSelectBalloonContentLayout = {
    template: `
        <ul>
            <li><a class="selectpm-remove">Удалить точку</a></li>
        </ul>
        `,
    config: {
        build: function () {
            this.constructor.superclass.build.call(this)
            let element = this.getElement().querySelector('.selectpm-remove')
            this._events = window.ymaps.domEvent.manager.group(element)
            this._events.add('click', (e) => {
                this.events.fire('userclose')
            })
        },
        clear: function () {
            this._events.removeAll()
            this.constructor.superclass.clear.call(this)
        }
    }
}

const clustererDefault = {
    config: {}
}

const placeMarkSmall = {
    template: `
        <div class="map-placemark-container">
          <div class="map-placemark-small $[properties.className]">
            <i class="icon-small icon-categories icon-categories_$[properties.categorySlug]"></i>
          </div>
        </div>
        `
}

const placeMarkSmallSelected = {
    template: `
        <div class="map-placemark-container map-placemark-container_selected">
          <div class="map-placemark-small map-placemark-small_selected $[properties.className]">
            <i class="icon-small icon-categories icon-categories_$[properties.categorySlug]"></i>
          </div>
        </div>
        `
}

const placeMarkBlock = {
    template: `
        <div class="map-block-placemark" style="background-color: #$[properties.blockColor];">
          <i class="icon icon-action icon-action-important map-block-placemark__icon"></i>
          <div class="map-block-placemark__text">$[properties.blockText]</div>
        </div>`,
    config: {}
}

export default Ymap
