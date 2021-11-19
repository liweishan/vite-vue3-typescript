import request from '@/utils/request'

const prefix = {
  manage: '/manage'
}

/**
 * 上传excl文件
 */
export function getImportInfo(data: object): Promise<{}> {
  return request({
    url: `${prefix.manage}/archivesinfo/getImportInfo`,
    method: 'POST',
    noLoading: true,
    data
  })
}

/**
 * 获取全宗信息列表
 */
export function getQuanzongInfoList(): Promise<{}> {
  return request({
    url: `${prefix.manage}/quanzong/getQuanzongInfoList`,
    method: 'GET'
  })
}

/**
 * 查看数据库表信息 
 */
export function getArchivesInfoColumn(tableName: string = ''): Promise<{}> {
  return request({
    url: `${prefix.manage}/archivesinfo/getTableColumn?tableName=${tableName}`,
    method: 'POST'
  })
}

/**
 * 新增档案数据，新增单条数据
 */
export function insertArchivesInfo(data: object): Promise<{}> {
  return request({
    url: `${prefix.manage}/archivesinfo/insertArchivesInfo`,
    method: 'POST',
    data
  })
}

/**
 * 新增档案数据，新增多条数据
 */
export function insertArchivesInfoList(data: object): Promise<{}> {
  return request({
    url: `${prefix.manage}/archivesinfo/insertArchivesInfoList`,
    method: 'POST',
    data,
    timeout: 60000
  })
}

/**
 * 修改档案数据
 */
export function updateArchivesInfoList(data: object): Promise<{}> {
  return request({
    url: `${prefix.manage}/archivesinfo/updateArchivesInfoList`,
    method: 'POST',
    data
  })
}

/**
 * 获取档案列表
 */
export function getArchivesInfoList(data: object, params?: object): Promise<{}> {
  return request({
    url: `${prefix.manage}/archivesinfo/getArchivesInfoList`,
    method: 'POST',
    data,
    params
  })
}

/**
 * 删除档案数据
 */
export function deleteArchivesInfoByIds(data: object): Promise<{}> {
  return request({
    url: `${prefix.manage}/archivesinfo/deleteArchivesInfoByIds`,
    method: 'POST',
    data
  })
}

/**
 * 获取档案目录列表
 */
export function archivesCatalogueList(): Promise<{}> {
  return request({
    url: `${prefix.manage}/archivesCatalogue/archivesCatalogueList`,
    method: 'GET'
  })
}

/**
 * 新增档案目录
 */
export function addArchivesCatalogue(data: object): Promise<{}> {
  return request({
    url: `${prefix.manage}/archivesCatalogue/addArchivesCatalogue`,
    method: 'POST',
    noLoading: true,
    data
  })
}

/**
 * 修改档案目录
 */
export function updateArchivesCatalogue(data: object): Promise<{}> {
  return request({
    url: `${prefix.manage}/archivesCatalogue/updateArchivesCatalogue`,
    method: 'POST',
    noLoading: true,
    data
  })
}

/**
 * 删除档案目录
 */
export function deleteArchivesCatalogue(id?: number): Promise<{}> {
  return request({
    url: `${prefix.manage}/archivesCatalogue/del?id=${id}`,
    method: 'GET'
  })
}



/**
 * 根据档案目录ID查看字段匹配
 */
export function getMatch(params: object): Promise<{}> {
  return request({
    url: `${prefix.manage}/archivesinfo/getMatch`,
    method: 'GET',
    params
  })
}

/**
 * 新增匹配字段
 */
export function addMatch(data: object): Promise<{}> {
  return request({
    url: `${prefix.manage}/archivesinfo/addMatch`,
    method: 'POST',
    data
  })
}

/**
 * 直接覆盖匹配规则
 */
export function insertMatch(data: any[]): Promise<{}> {
  return request({
    url: `${prefix.manage}/archivesinfo/insertMatch`,
    method: 'POST',
    data
  })
}

/**
 * 修改匹配字段
 */
export function editeMatch(data: object): Promise<{}> {
  return request({
    url: `${prefix.manage}/archivesinfo/editeMatch`,
    method: 'POST',
    data
  })
}

/**
 * 删除匹配字段
 */
export function deleteMatchById(ids: string | number): Promise<{}> {
  return request({
    url: `${prefix.manage}/archivesinfo/delMatchById?ids=${ids}`,
    method: 'GET'
  })
}

/**
 * 添加档案界面设计字段
 */
export function saveField(data: object): Promise<{}> {
  return request({
    url: `${prefix.manage}/interface/add`,
    method: 'POST',
    noLoading: true,
    data
  })
}

/**
 * 修改档案界面设计字段
 */
export function editField(data: object): Promise<{}> {
  return request({
    url: `${prefix.manage}/interface/update`,
    noLoading: true,
    method: 'POST',
    data
  })
}

/**
 * 删除档案界面设计字段(根据id删除)
 */
export function deleteField(ids: string | number): Promise<{}> {
  return request({
    url: `${prefix.manage}/interface/delByIds?ids=${ids}`,
    method: 'GET'
  })
}

/**
 * 删除档案界面设计字段(根据目录id删除)
 */
export function deleteFieldCatalogueId(catalogueId: number): Promise<{}> {
  return request({
    url: `${prefix.manage}/interface/delByCatalogueId?catalogueId=${catalogueId}`,
    method: 'GET'
  })
}

/**
 * 根据目录id查询表格字段
 */
export function getInterfaceList(catalogueId?: number | string): Promise<{}> {
  return request({
    url: `${prefix.manage}/interface/getInterfaceList?catalogueId=${catalogueId}`,
    method: 'GET'
  })
}

/**
 * 条件查询表格字段
 */
export function getInterface(params: object): Promise<{}> {
  return request({
    url: `${prefix.manage}/interface/getInterface`,
    method: 'GET',
    params
  })
}

/**
 * 新增数据库表字段
 */
export function addTableColumnList(data: any[]): Promise<{}> {
  return request({
    url: `${prefix.manage}/sqlSysetm/addTableColumnList`,
    method: 'POST',
    data
  })
}

/**
 * 新增数据库表字段
 */
 export function updateColumnComment(data: any[]): Promise<{}> {
  return request({
    url: `${prefix.manage}/sqlSysetm/updateColumnComment`,
    method: 'POST',
    data
  })
}

/**
 * 修改数据库表字段
 */
export function updateTableColumnList(data: any[]): Promise<{}> {
  return request({
    url: `${prefix.manage}/sqlSysetm/updateTableColumnList`,
    method: 'POST',
    data
  })
}

/**
 * 获取数据库表字段
 */
export function getTableInfoByTableName(tableName?: string): Promise<{}> {
  return request({
    url: `${prefix.manage}/sqlSysetm/getTableInfoByTableName?tableName=${tableName}`,
    method: 'GET'
  })
}

/**
 * 删除数据库表字段
 */
export function dropColumn(params: object): Promise<{}> {
  return request({
    url: `${prefix.manage}/sqlSysetm/dropColumn`,
    method: 'GET',
    params
  })
}

/**
 * 文件挂接（文件上传）
 */
export function hookByUpload(data: object, params: object, onUploadProgress?: Function): Promise<{}> {
  return request({
    url: `${prefix.manage}/fileHook/hookByUpload`,
    method: 'POST',
    data,
    params,
    timeout: 90000,
    onUploadProgress
  })
}

/**
 * 文件挂接（源文件挂接）
 */
 export function hookByResource(params: object): Promise<{}> {
  return request({
    url: `${prefix.manage}/fileHook/hookByResource`,
    method: 'POST',
    params,
    timeout: 90000000
  })
}

/**
 * 文件挂接（根据数据id单个挂接）
 */
export function hookUpload(data: FormData, params: object, onUploadProgress?: Function): Promise<{}> {
  return request({
    url: `${prefix.manage}/fileHook/upload`,
    method: 'POST',
    data,
    params,
    timeout: 90000,
    onUploadProgress
  })
}

/**
 * 获取档案列表下拉选择的api
 */
export function getInterfaceTableDate(): Promise<{}> {
  return request({
    url: `${prefix.manage}/interface/getInterfaceTableDate`,
    method: 'GET'
  })
}

/**
 * 获取保管期限的数据
 */
export function getStorageTimeList(): Promise<{}> {
  return request({
    url: `${prefix.manage}/storageTime/getStorageTimeList`,
    method: 'GET'
  })
}

/**
 * 根据url获取文件流
 */
export function getFile(url: string): Promise<{}> {
  return request({
    url: `${prefix.manage}/fileHook/getFile?url=${url}`,
    method: 'GET',
    responseType: 'blob'
  })
}
