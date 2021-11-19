import Mock from 'mockjs2'
// import { builder } from '../util'

const logout = () => {
  return {
    msg: 'success',
    code: 0
  }
}

const login = () => {
  const res = {
    msg: 'success',
    code: 0,
    expire: 43200,
    userId: 1,
    token: '15eff893d3c44e82a469ea3850e4125e'
  }
  return res
}

Mock.mock(/\/api\/auth\/logout/, 'post', logout)
Mock.mock(/\/api\/auth\/login/, 'post', login)
