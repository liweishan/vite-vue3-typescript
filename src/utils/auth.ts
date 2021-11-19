import Cookies from 'js-cookie'
import { ILoginInfo } from '@/store/modules/user'
export function getToken(): string {
  return Cookies.get('token') || ''
}

export function setToken(token: string) {
  return Cookies.set('token', token)
}

export function removeToken(): void {
  return Cookies.remove('token')
}

export function getUserId(): string {
  return Cookies.get('userId') || ''
}

export function setUserId(token: string) {
  return Cookies.set('userId', token)
}

export function removeUserId(): void {
  return Cookies.remove('userId')
}

export function getLoginInfo(): ILoginInfo | null {
  const loginInfo = Cookies.get('loginInfo')
  return loginInfo ? JSON.parse(loginInfo) : null
}

export function setLoginInfo(loginInfo: Object) {
  return Cookies.set('loginInfo', JSON.stringify(loginInfo), { expires: 7 })
}

export function removeLoginInfo(): void {
  return Cookies.remove('loginInfo')
}

export function getRouterInfo(): any[] {
  const routerInfo = Cookies.get('routerInfo')
  return routerInfo ? JSON.parse(routerInfo) : []
}

export function setRouterInfo(routerInfo: any[]) {
  return Cookies.set('routerInfo', JSON.stringify(routerInfo))
}

export function removeRouterInfo(): void {
  return Cookies.remove('routerInfo')
}