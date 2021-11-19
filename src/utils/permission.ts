import { RouteRecordRaw } from 'vue-router'
import { BaseLayout } from '@/layout/index'
import components from './glob'

const constantRouterComponents: any = {
  BaseLayout
}

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '/:pathMatch(.*)*',
  name: '*',
  redirect: '/404',
  meta: {
    hidden: true
  }
}
/**
 * 组装数据，获取addRouters
 */
export function getAddRouters(list: any[]): RouteRecordRaw[] {
  const metas: string[] = ['parentId', 'menuName', 'visible', 'menuId', 'icon', 'hiddenChildren', 'hiddenHeader']
  const routes = list.filter(v => {
    // 菜单类型不能为F(F是按钮)，菜单状态visible为1是隐藏菜单
    const child = list.filter(e => e.parentId === v.menuId && e.menuType !== 'F' && +e.visible !== 1)
    v.path = v.path || ''
    v.redirect = v.redirect || ''
    v.name = v.menuKey
    if (child.length) {
      v.children = child
    } else {
      delete v.children
    }

    v.meta = {}
    for (const k of metas.values()) {
      v.meta[k] = v[k]
    }

    v.component = constantRouterComponents[v.component] || components[v.component]
    // 菜单状态visible为1是隐藏菜单
    if (+v.meta.parentId === 0 && +v.visible !== 1) {
      return v
    }
  })
  
  if (routes.length) {
    routes[0].path = '/'
  }
  routes.push(notFoundRouter)
  return routes
}
