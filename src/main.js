import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {sync} from 'vuex-router-sync'
import './plugins/element.js'

// Resolve the dependencies
require('./bootstrap')
sync(store, router)

// Globally register the components for project-wide use
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
