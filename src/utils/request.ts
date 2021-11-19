import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { UserModule } from 'store/modules/user'
import { message } from 'ant-design-vue'
import loading from 'coms/loading'

const env = import.meta.env
const baseURL = env.VITE_APP_NODE_ENV === 'production' ? `${location.origin}/api` : `${env.VITE_APP_BASE_URL}`

const instance: AxiosInstance = axios.create({
  // baseURL: 'http://192.168.1.78:7000/api',
  baseURL,
  timeout: 30000
})

interface IConfig {
  urls: any
  num: number,
  removeLoading: Function | null
}
const other: IConfig = {
  urls: {},
  num: 0,
  removeLoading: null
}

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 如果需要加锁且url重复就return掉
    if (!config.noLock && other.urls[config.url] === config.url) {
      return
    } else {
      other.urls[config.url] = config.url
    }
    
    // 是否不开启loading
    if (!config.noLoading && !other.num) {
      other.removeLoading = loading()
    }
    other.num ++
    const token: string = UserModule.token
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: any) => {
    other.num --
    delete other.urls[response.config.url]
    // 当多个请求同时开启loading，请求全部结束才关闭loading
    if (!other.num && other.removeLoading) {
      other.removeLoading()
      other.removeLoading = null
    }
    const { code, msg } = response.data
    if (!+code) {
      return response.data
    } else {
      message.error(msg)
      return Promise.reject(response.data)
    }
  },
  (error: any) => {
    other.num --
    if (error.response) {
      delete other.urls[error.response.config.url]
    } else {
      other.urls = {}
    }
    // 当多个请求同时开启loading，请求全部结束才关闭loading
    if (!other.num && other.removeLoading) {
      other.removeLoading()
      other.removeLoading = null
    }

    const status = error.response?.status
    if (status === 401 && UserModule.token) {
      UserModule.Logout()
    } else if (error.toJSON().message === 'Network Error') {
      message.error('请检查您的网络是否正常！')
    } else if (status) {
      message.error(`网络${status}！`)
    } else {
      message.error('服务连接异常！')
    }
    return Promise.reject(error)
  }
)

export default instance