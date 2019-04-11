import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/DashboardContainer.vue')
    },
    {
      path: '/another',
      name: 'another',
      component: () => import(/* webpackChunkName: "map" */ './views/AnotherContainer.vue')
    }
  ]
})
