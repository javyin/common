import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '../views/Home.vue'),
        meta: {
            title: '首页'
        },
        children: [
            {
                path: 'type',
                name: 'type',
                component: () => import(/* webpackChunkName: 'type' */ '../views/Type'),
                meta: {
                    title: '分类'
                }
            },
            {
                path: 'tips',
                name: 'tips',
                component: () => import(/* webpackChunkName: 'tips' */ '../views/Tips'),
                meta: {
                    title: '提醒'
                }
            },
            {
                path: 'me',
                name: 'me',
                component: () => import(/* webpackChunkName: 'me' */ '../views/Me'),
                meta: {
                    title: '我的'
                }
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
