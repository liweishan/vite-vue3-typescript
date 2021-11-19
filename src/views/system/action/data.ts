import { tirm } from 'utils/validate'
export interface IItem {
  permsName?: string
  perms?: string,
  id?: number
}

export const columns = Object.freeze([
  {
    title: '权限名称',
    dataIndex: 'permsName',
    align: 'center',
    width: '160px'
  },
  {
    title: '权限标识',
    dataIndex: 'perms',
    align: 'center',
    width: '180px'
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
  permsName: [
    {
      required: true,
      message: '权限名称不能为空'
    },
    {
      pattern: tirm,
      message: '前后不允许有空格'
    }
  ],
  perms: [
    {
      required: true,
      message: '权限标识不能为空'
    },
    {
      pattern: tirm,
      message: '前后不允许有空格'
    }
  ]
})
