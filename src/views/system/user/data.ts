import { email, phoneNumber } from 'utils/validate'

export interface IItem {
  userId?: number
  userName?: string
  loginName?: string
  status?: string
  statusText?: string
  createTime?: string
  createBy?: string
  email?: string
  remark?: string
}

export interface IForm {
  userName?: string
  password?: string
  loginName?: string
  email?: string
  phonenumber?: string
  status?: string
  userId?: number
  sex?: string
  roleIds?: number[] | string
  remark?: string
}

export interface ISearch {
  userName?: string
  status?: string
}

export const columns = Object.freeze([
  {
    title: '用户名',
    dataIndex: 'userName',
    align: 'center',
    width: '160px'
  },
  {
    title: '登录名',
    dataIndex: 'loginName',
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
    title: '创建人',
    dataIndex: 'createBy',
    align: 'center',
    width: '160px'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    align: 'center',
    width: '180px'
  },
  {
    title: '电话号码',
    dataIndex: 'phonenumber',
    align: 'center',
    width: '140px'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    width: '160px'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    align: 'center',
    className: 'remark',
    width: '200px',
    slots: {
      customRender: 'remark' 
    }
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

export const rules: object = {
  userName: {
    required: true,
    message: '用户名不能为空'
  },
  loginName: {
    required: true,
    message: '登录名不能为空'
  },
  password: {
    required: true,
    message: '密码不能为空'
  },
  email: [
    {
      required: true,
      message: '邮箱不能为空'
    },
    {
      pattern: email,
      message: '请输入正确的邮箱'
    }
  ],
  phonenumber: [
    {
      required: true,
      message: '电话号码不能为空'
    },
    {
      pattern: phoneNumber,
      message: '请输入正确的电话号码'
    }
  ],
  status: {
    required: true,
    message: '请选择状态'
  },
  sex: {
    required: true,
    message: '请选择性别'
  },
  roleIds: {
    required: true,
    message: '请选择角色'
  }
}