import { IReplaceFields } from 'data/system'

export interface IItem {
  roleId?: number
  roleName?: string
  roleKey?: string
  status?: string
  statusText?: string
  roleSort?: string
  remark?: string
}

export interface IForm {
  roleName?: string
  roleKey?: string
  status?: string
  roleId?: number
  roleSort?: string
  menuIds?: object
}

export interface ISearch {
  roleName?: string
  status?: string
}

export const columns = Object.freeze([
  {
    title: '角色名称',
    dataIndex: 'roleName',
    align: 'center',
    width: '160px'
  },
  {
    title: '权限字符',
    dataIndex: 'roleKey',
    align: 'center',
    width: '160px'
  },
  {
    title: '状态',
    dataIndex: 'statusText',
    align: 'center',
    width: '160px'
  },
  {
    title: '显示顺序',
    dataIndex: 'roleSort',
    align: 'center',
    width: '120px'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    width: '160px'
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
  roleName: {
    required: true,
    message: '角色名不能为空'
  },
  roleKey: {
    required: true,
    message: '权限字符不能为空'
  },
  roleSort: {
    required: true,
    message: '显示顺序不能为空'
  },
  status: {
    required: true,
    message: '请选择状态'
  },
  menuIds: {
    required: true,
    message: '请选择菜单权限'
  }
})

export const replaceFields: IReplaceFields = Object.freeze({
  title: 'menuName',
  key: 'menuId'
})