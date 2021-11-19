import { AxiosRequestConfig } from 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    noLoading?: boolean // true不要loading，反之需要
    noLock?: boolean // true不加锁，反需要
  }
}
