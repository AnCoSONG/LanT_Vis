import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('views/home.vue')
        },
        {
            path: '/procedure',
            name: 'Procedure',
            component: () => import('views/procedure.vue')
        }
    ],
    scrollBehavior: (to, from, savedPosition) => {
        return { left: 0, top: 0, behavior: 'smooth' }
    }
})

import NProgress from 'nprogress'
import 'styles/nprogress.scss'

NProgress.configure({easing: 'ease', speed: 500, showSpinner: false })

// const defaultTitle = 'Human-Centered Restoration'
router.beforeEach((to, from, next) => {
    // console.log(to, from)
    NProgress.start()
    // document.title = to.meta.title ? to.meta.title+ ' | '+  defaultTitle: defaultTitle
    next()
})

router.afterEach((to, from) => {
    // console.log(to, from)
    NProgress.done()
})

export default router