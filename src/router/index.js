import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import cat from '@/components/cat'
import cart from '@/components/cart'
import mine from '@/components/mine'
import prodetails from '@/components/prodetails'
import confirmpro from '@/components/confirmpro'
import address from '@/components/address'
import orderlist from '@/components/orderlist'
import test from '@/components/test'

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
            path: '/cart',
            name: 'cart',
            component: cart
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
        },
        {
            path: '/confirmpro',
            name: 'confirmpro',
            component: confirmpro
        },
        {
            path: '/address',
            name: 'address',
            component: address
        },
        {
            path: '/orderlist',
            name: 'orderlist',
            component: orderlist
        },
        {
            path: '/test',
            name: 'test',
            component: test
        }
    ]
})