import { IStatus } from 'data/system'

export const stateKyes: IStatus = Object.freeze({
  0: '开启',
  1: '关闭'
})

export interface IForm {
  databaseBackupAddr?: string
  fileBackupAddr?: string
  fileUploadAddr?: string
  useState?: string
  remarks?: string
  id?: string
}

export const rules: object = Object.freeze({
  databaseBackupAddr: {
    required: true,
    whitespace: true,
    message: '数据库备份地址不能为空'
  },
  fileBackupAddr: {
    required: true,
    whitespace: true,
    message: '文件备份地址不能为空'
  },
  fileUploadAddr: {
    required: true,
    whitespace: true,
    message: '文件上传地址不能为空'
  },
  useState: {
    required: true,
    message: '请选择配置是否开启'
  }
})

export interface ISpace {
  freeSpace?: string
  usedSpace?: string
  totalSpace?: string
}

export const spaceKey: ISpace =  {
  freeSpace: '剩余空间',
  usedSpace: '已用空间'
}