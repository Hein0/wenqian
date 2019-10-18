import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/home/Home'),
            meta: {
                keepAlive: true,
                isBack: false,
            }
        },
        {
            path: '/home/district',
            name: 'homeDistrict',
            component: () => import('./views/home/District'),
            meta: {
                keepAlive: true,
                isBack: false,
            }
        },
        {
            path: '/nine/nineDistrict',
            name: 'nineDistrict',
            component: () => import('./views/home/Nine_District'),
            meta: {
                keepAlive: true,
                isBack: false,
            }
        },
        {
            path: '/home/brand',
            name: 'homeBrand',
            component: () => import('./views/home/Brand'),
            meta: {
                keepAlive: true,
                isBack: false,
            }
        },
        {
            path: '/hot',
            name: 'hot',
            component: () => import('./views/hot/Index'),
            meta: {
                keepAlive: true,
                isBack: false,
            }
        },
        {
            path: '/discovery',
            name: 'discovery',
            component: () => import('./views/discovery/List'),
            meta: {
                keepAlive: true,
                isBack: false,
            }
        },
        {
            path: '/discovery/theme',
            name: 'discoveryTheme',
            component: () => import('./views/discovery/Theme'),
            meta: {
                keepAlive: true,
                isBack: false,
            }
        },
        {
            path: '/talent',
            name: 'talent',
            component: () => import('./views/talent/List'),
            meta: {
                keepAlive: true,
                isBack: false,
            }
        },
        {
            path: '/talent/article',
            name: 'talentArticle',
            component: () => import('./views/talent/Article'),
            meta: {
                keepAlive: false,
                isBack: false,
            }
        },
        {
            path: '/my',
            name: 'my',
            component: () => import('./views/my/My'),
            meta: {
                keepAlive: true,
                isBack: false,
            }
        },
        {
            path: '/my/footprint',
            name: 'myFootprint',
            component: () => import('./views/my/Footprint'),
            meta: {
                keepAlive: true,
                isBack: false,
            }
        },
        {
            path: '/my/collect',
            name: 'myCollect',
            component: () => import('./views/my/Collect')
        },
        {
            path: '/my/msg/msgList',
            name: 'myMsgList',
            component: () => import('./views/my/MsgList'),
            meta: {
                keepAlive: true,
                isBack: false,
            }
        },
        {
            path: '/my/msg/courseList',
            name: 'myMsgList',
            component: () => import('./views/my/CourseList'),
            meta: {
                keepAlive: true,
                isBack: false,
            }
        },
        {
            path: '/my/msg/article',
            name: 'myMsgList',
            component: () => import('./views/my/Article'),
            meta: {
                keepAlive: true,
                isBack: false,
            }
        },
        {
            path: '/goods',
            name: 'goods',
            component: () => import('@/views/goods/Index'),
        },
        {
            path: '/search/main',
            name: 'searchMain',
            component: () => import('@/views/search/Search'),
            meta: {
                keepAlive: true,
                isBack: false,
            }
        },
        {
            path: '/search/goods',
            name: 'searchGoods',
            component: () => import('@/views/search/SearchGoods'),
            meta: {
                keepAlive: true,
                isBack: false,
            }
        },
        {
            path: '/error/404',
            name: '404',
            component: () => import('@/views/error/404'),
        },
        {
            path: "*",
            redirect: "/error/404"
        }
    ],
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})
