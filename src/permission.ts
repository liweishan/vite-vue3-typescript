import { RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
import router from './router'
import NProgress from 'nprogress'
// import { message } from 'ant-design-vue'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission'
import { getDeepCopy } from 'utils/util'

import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']


router.beforeEach(async(to: RouteLocationNormalized, _: RouteLocationNormalized, next: Function) => {
  NProgress.start()
  if (UserModule.token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (UserModule.routerInfo.length === 0) {
        try {
          await UserModule.GetRouterInfo()
          const addRoutes: RouteRecordRaw[] = await PermissionModule.GenerateRoutes(getDeepCopy(UserModule.routerInfo))
          addRoutes.forEach((route: RouteRecordRaw) => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch (err) {
          // message.error(`${err}` || 'Has Error')
          await UserModule.Logout()
          next(`/login${to.path !== '/' ? `?redirect=${to.path}` : ''}`)
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login${to.path !== '/' ? `?redirect=${to.path}` : ''}`)
      NProgress.done()
    }
  }
})

router.afterEach((to: RouteLocationNormalized) => {
  NProgress.done()
  // 路由结束的时候把当前路由的权限存入vuex
  const routerInfo = UserModule.routerInfo
  // F代表按钮类型
  const actions = routerInfo.filter(e => e.parentId === to.meta?.menuId && e.menuType === 'F')
  PermissionModule.SetRoles(actions)
  const title: string = to.meta?.menuName ? `${to.meta.menuName}` : ''
  if (title) {
    document.title = title
  }
})
