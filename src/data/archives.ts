import { IReplaceFields, IStatus } from 'data/system'
export interface ICatalogue {
  archivesType?: string
  parentId?: number
  tableName?: string
  id?: number
  remarks?: string
  children?: ICatalogue[]
}

export interface IField {
  id?: number
  field?: string
  fieldName?: string
  catalogueId?: number
  required?: string
  requiredText?: string
  retrieval?: string
  display?: string
  displayText?: string
  retrievalText?: string
  width?: number
  records_name?: string
}

export const replaceFields: IReplaceFields = Object.freeze({
  title: 'archivesType',
  key: 'id',
  children: 'children',
  value: 'id'
})

export const dataStatus: IStatus = Object.freeze({
  0: '字符串',
  1: '数字'
})