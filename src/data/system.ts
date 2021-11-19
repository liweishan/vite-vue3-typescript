
export interface IMenuTypeKey {
  M: string
  C: string
  F: string
}
// 菜单类型
export const menuTypeKey: IMenuTypeKey = Object.freeze({
  M: '目录',
  C: '菜单',
  F: '按钮'
})


export interface IReplaceFields {
  children?: string
  title?: string
  key?: string
}

export interface IStatus {
  0: string
  1: string
  2?: string
}

// 菜单显示隐藏状态
export const visibleKey: IStatus = Object.freeze({
  0: '显示',
  1: '隐藏',
  2: '隐藏菜单'
})


// 用户启用状态
export const userStatusKey: IStatus = Object.freeze({
  0: '正常',
  1: '禁用'
})

// 性别
export const sexKey: IStatus = Object.freeze({
  0: '男',
  1: '女'
})