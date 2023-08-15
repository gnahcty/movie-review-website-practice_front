import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory, START_LOCATION } from 'vue-router'
import routes from './routes'
import { useUserStore } from '../stores/user.js'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.afterEach((to, from) => {
    document.title = to.meta.title
  })

  Router.beforeEach(async (to, from, next) => {
    const user = useUserStore()
    if (from === START_LOCATION) {
      await user.getProfile()
    }

    // TODO: 登入後跳回原本頁面
    if (user.isLogin && ['/?tab=register', '/?tab=login'].includes(to.path)) {
      next('/?tab=""')
    } else if (to.meta.login && !user.isLogin) {
      next('/?tab=login')
    } else if (to.meta.admin && !user.isAdmin) {
      next('/')
    } else {
      next()
    }
  })

  return Router
})
