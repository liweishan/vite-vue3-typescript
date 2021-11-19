import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { RouteRecordRaw } from 'vue-router'

import store from '@/store'
import { getAddRouters } from 'utils/permission'

export interface IPermissionState {
  routes: RouteRecordRaw[],
  roles: any[]
}

@Module({
  name: 'permission', dynamic: true, namespaced: true, store
})
export default class Permission extends VuexModule implements IPermissionState {
  public routes = []
  public roles = []
  
  @Mutation
  private SET_ROUTES(routes: any) {
    this.routes = routes
  }

  @Mutation
  private SET_ROLES(roles: any) {
    this.roles = roles
  }

  @Action
  public async GenerateRoutes(routers: any[]) {
    const addRoutes = getAddRouters(routers)
    this.SET_ROUTES(addRoutes)
    if (addRoutes.length) {
      return Promise.resolve(addRoutes)
    } else {
      return Promise.reject(false)
    }
  }

  @Action
  public async SetRoles(roles: any[]) {
    this.SET_ROLES(roles)
  }
}

export const PermissionModule = getModule(Permission)