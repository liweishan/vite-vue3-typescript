export interface IItem {
  menuId: number
  menuName: string
  menuKey: string
  component: string
  orderNum: number
  menuType: string
  menuTypeText?: string
  path: string
  redirect: string
  perms: string
  status: string
  visible: string
  visibleText?: string
}

export interface IForm {
  menuId?: number
  parentId?: number
  menuType?: string
  menuName?: string
  menuKey?: string
  perms?: string
  component?: string
  icon?: string
  target?: string
  path?: string
  redirect?: string
  acitveMenu?: string
  hiddenChildren?: boolean
  hiddenHeader?: boolean
  orderNum?: number
  visible?: string
}

export interface ISearch {
  menuKey?: string
  menuName?: string
  visible?: string
}

export const columns = Object.freeze([
  {
    title: '权限名称',
    dataIndex: 'menuName',
    width: '200px'
  },
  {
    title: '路由唯一键',
    dataIndex: 'menuKey',
    width: '200px'
  },
  {
    title: '组件',
    dataIndex: 'component',
    width: '200px'
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    width: '100px'
  },
  {
    title: '按钮类型',
    dataIndex: 'menuTypeText',
    width: '120px'
  },
  {
    title: '链接',
    dataIndex: 'path',
    width: '200px'
  },
  {
    title: '重定向',
    dataIndex: 'redirect',
    width: '200px'
  },
  {
    title: '权限标识',
    dataIndex: 'perms',
    width: '200px'
  },
  {
    title: '状态',
    dataIndex: 'visibleText',
    width: '120px'
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: '200px',
    slots: { 
      customRender: 'action' 
    }
  }
])

export const rules: object = Object.freeze({
  parentId: {
    required: true,
    message: '请选择上级权限'
  },
  menuType: {
    required: true,
    message: '请选择菜单类型'
  },
  menuName: {
    required: true,
    whitespace: true,
    message: '请输入权限名称'
  },
  menuKey: {
    required: true,
    whitespace: true,
    message: '请输入路由唯一键'
  },
  orderNum: {
    required: true,
    message: '请输入显示顺序'
  },
  component: {
    required: true,
    whitespace: true,
    message: '请输入组件名'
  },
  visible: {
    required: true,
    message: '请选择显示方式'
  }
})