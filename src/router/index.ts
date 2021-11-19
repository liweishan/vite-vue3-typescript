import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import routes from './base-router'

import { PermissionModule } from '@/store/modules/permission'

const router: any = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes
})

export function resetRouter() {
  const routers: RouteRecordRaw[] = PermissionModule.routes
  routers.forEach(v => {
    router.removeRoute(v.name)
  })
}

export default router
