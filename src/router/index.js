import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import cat from '@/components/cat'
import car from '@/components/car'
import mine from '@/components/mine'
import prodetails from '@/components/prodetails'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{ path: '/', redirect: { name: 'home' } },
        {
            path: '/home',
            name: 'home',
            component: home
        },
        {
            path: '/cat',
            name: 'cat',
            component: cat
        },
        {
            path: '/car',
            name: 'car',
            component: car
        },
        {
            path: '/mine',
            name: 'mine',
            component: mine
        },
        {
            path: '/prodetails',
            name: 'prodetails',
            component: prodetails
        }
    ]
})