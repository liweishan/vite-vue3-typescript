import request from '@/utils/request'

export function getUserInfo(): Promise<{}> {
  return request({
    url: 'user/info',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function login(data: object): Promise<{}> {
  return request({
    url: '/auth/login',
    method: 'POST',
    noLoading: true,
    data
  })
}

export function logout(): Promise<{}> {
  return request({
    url: '/auth/logout',
    method: 'POST',
    noLoading: true
  })
}

export function getRoutes(): Promise<{}> {
  return request({
    url: 'auth/getRoutes',
    method: 'POST'
  })
}
