import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    base: '',
    mode: 'history',
    routes: [
        { path: '/', redirect: '/services' },
        {
            path: '/:routerState',
            meta: {
                title: route => {
                    return route.params.routerState
                }
            },
            props: (route) => {
                return {routerState: route.params.routerState}
            },
            component: () => import(/* webpackChunkName: "dashboard" */ './views/DashboardContainer.vue')
        }
    ]
})
