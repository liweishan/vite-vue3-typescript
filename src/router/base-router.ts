import { RouteRecordRaw } from 'vue-router'
import Login from '@/views/user/login/index.vue'

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    name: 'Error404',
    component: () => import('@/views/error/error404/index.vue'),
    meta: {
      title: '404'
    }
  }
] as Array<RouteRecordRaw>
