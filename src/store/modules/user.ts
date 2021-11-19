
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { resetRouter } from '@/router'
import { 
  getToken,
  setToken,
  getUserId,
  setUserId,
  removeUserId,
  removeToken,
  getLoginInfo,
  setLoginInfo,
  removeLoginInfo,
  getRouterInfo,
  setRouterInfo,
  removeRouterInfo
} from 'utils/auth'
import { login, logout } from 'api/user'
import { getRoutes } from 'api/system'

export interface ILoginInfo {
  username?: string
  password?: string
  check?: boolean
}

export interface IUserState {
  token: string
  userId: string
  loginInfo: ILoginInfo | null
  routerInfo: any[]
}

@Module({
  name: 'user', dynamic: true, namespaced: true, store
})
export default class User extends VuexModule implements IUserState {
  public token = getToken()
  public userId = getUserId()
  public loginInfo = getLoginInfo()
  public routerInfo = new Array()

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
    token ? setToken(token) : removeToken()
  }

  @Mutation
  private SET_USERID(userId: string) {
    this.userId = userId
    userId ? setUserId(userId) : removeUserId()
  }
  
  @Mutation
  private SET_LOGININFO(loginInfo: ILoginInfo) {
    if (loginInfo.check) {
      this.loginInfo = loginInfo
      setLoginInfo(loginInfo)
    } else {
      this.loginInfo = null
      removeLoginInfo()
    }
  }

  @Mutation
  private SET_ROUTERINFO(routerInfo: any[]) {
    if (Array.isArray(routerInfo) && routerInfo.length) {
      this.routerInfo = routerInfo
      setRouterInfo(routerInfo)
    } else {
      this.routerInfo = []
      removeRouterInfo()
    }
  }

  @Action
  public Login(values: object): Promise<{}> {
    return new Promise(async (resolve: Function, reject: Function) => {
      try {
        const res: any = await login(values)
        this.SET_LOGININFO(values)
        const { token, userId } = res
        this.SET_TOKEN(token)
        this.SET_USERID(userId)
        resolve()
      } catch (err) {
        reject(false)
      }
    })
  }

  @Action
  public async GetRouterInfo(notStorage?: boolean) {
    const routers: any[] = getRouterInfo()
    // 读取缓存（notStorage为true不读缓存，反之读取）,且缓存有值
    if (!notStorage && routers.length) {
      const routerInfo: any[] = routers
      this.SET_ROUTERINFO(routerInfo)
      return Promise.resolve(routerInfo)
    }
    try {
      const res: any = await getRoutes()
      this.SET_ROUTERINFO(res.rows)
      return Promise.resolve(res.rows)
    } catch (err) {
      return Promise.reject(false)
    }
  }

  @Action
  public async Logout() {
    try {
      await logout()
    } catch(e) {
      // 
    } finally {
      this.SET_TOKEN('')
      this.SET_USERID('')
      this.SET_ROUTERINFO([])
      resetRouter()
    }
  }
}

export const UserModule = getModule(User)