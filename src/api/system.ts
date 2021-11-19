import request from '@/utils/request'

const prefix = {
  manage: '/manage',
  system: '/system'
}

/**
 * 获取菜单列表
 */
export function getRoutes(): Promise<{}> {
  return request({
    url: `${prefix.system}/menu/list`,
    method: 'GET'
  })
}

/**
 * 根据角色ID来获取当前角色的菜单（用于勾选）
 */
 export function getMenuRole(roleId: number): Promise<{}> {
  return request({
    url: `${prefix.system}/menu/role/${roleId}`,
    method: 'GET'
  })
}

/**
 * 新增菜单
 */
export function menuSave(data: object): Promise<{}> {
  return request({
    url: `${prefix.system}/menu/save`,
    method: 'POST',
    data
  })
}

/**
 * 修改菜单
 */
export function menuUpdate(data: object): Promise<{}> {
  return request({
    url: `${prefix.system}/menu/update`,
    method: 'POST',
    data
  })
}

/**
 * 删除菜单
 */
export function menuRemove(menuId: number): Promise<{}> {
  return request({
    url: `${prefix.system}/menu/remove/${menuId}`,
    method: 'POST'
  })
}

/**
 * 获取用户数据
 */
export function userList(params?: object): Promise<{}> {
  return request({
    url: `${prefix.system}/user/list`,
    method: 'GET',
    params
  })
}

/**
 * 根据用户id获取当前用户的角色
 */
export function getUserRoles(userId: number): Promise<{}> {
  return request({
    url: `${prefix.system}/user/get/${userId}`,
    method: 'GET'
  })
}

/**
 * 新增用户
 */
export function userSave(data: object): Promise<{}> {
  return request({
    url: `${prefix.system}/user/save`,
    method: 'POST',
    data
  })
}

/**
 * 修改用户
 */
export function userUpdate(data: object): Promise<{}> {
  return request({
    url: `${prefix.system}/user/update`,
    method: 'POST',
    data
  })
}

/**
 * 删除用户
 */
export function userRemove(ids?: string): Promise<{}> {
  return request({
    url: `${prefix.system}/user/remove?ids=${ids}`,
    method: 'POST'
  })
}

/**
 * 新增角色
 */
export function roleSave(data: object): Promise<{}> {
  return request({
    url: `${prefix.system}/role/save`,
    method: 'POST',
    data
  })
}

/**
 * 修改角色
 */
 export function roleUpdate(data: object): Promise<{}> {
  return request({
    url: `${prefix.system}/role/update`,
    method: 'POST',
    data
  })
}

/**
 * 删除角色
 */
 export function roleRemove(ids: string): Promise<{}> {
  return request({
    url: `${prefix.system}/role/remove/?ids=${ids}`,
    method: 'POST'
  })
}

/**
 * 查询角色列表
 */
export function roleList(params: object): Promise<{}> {
  return request({
    url: `${prefix.system}/role/list`,
    method: 'GET',
    params
  })
}

/**
 * 查询所有的角色
 */
export function roleAll(): Promise<{}> {
  return request({
    url: `${prefix.system}/role/all`,
    method: 'GET'
  })
}

/**
 * 按钮权限列表获取
 */
 export function permsList(params?: object): Promise<{}> {
  return request({
    url: `${prefix.system}/perms/getPermsList`,
    method: 'POST',
    params
  })
}

/**
 * 新增按钮权限
 */
 export function permsSave(data: object): Promise<{}> {
  return request({
    url: `${prefix.system}/perms/insertPerms`,
    method: 'POST',
    data
  })
}

/**
 * 修改按钮权限
 */
 export function permsUpdate(data: object): Promise<{}> {
  return request({
    url: `${prefix.system}/perms/updatePerms`,
    method: 'POST',
    data
  })
}

/**
 * 删除按钮权限
 */
 export function permsRemove(ids: string): Promise<{}> {
  return request({
    url: `${prefix.system}/perms/detelePerms?ids=${ids}`,
    method: 'POST'
  })
}

/**
 * 添加数据备份系统配置
 */
 export function addSystemConfig(data: object): Promise<{}> {
  return request({
    url: `${prefix.manage}/systemInfo/addSystemConfig`,
    method: 'POST',
    data
  })
}

/**
 * 修改数据备份系统配置
 */
export function updateSystemConfig(data: object): Promise<{}> {
  return request({
    url: `${prefix.manage}/systemInfo/updateSystemConfig`,
    method: 'POST',
    data
  })
}

/**
 * 获取数据备份系统配置
 */
export function getSystemConfig(): Promise<{}> {
  return request({
    url: `${prefix.manage}/systemInfo/getSystemConfig`,
    method: 'GET'
  })
}

/**
 * 磁盘空间大小(文件存储地址列表)
 */
export function getDiskInfo(): Promise<{}> {
  return request({
    url: `${prefix.manage}/systemInfo/getDiskInfo`,
    method: 'GET'
  })
}

/**
 * 磁盘空间大小(文件存储地址列表)
 */
export function getLocalDiskInfo(): Promise<{}> {
  return request({
    url: `${prefix.manage}/systemInfo/getLocalDiskInfo`,
    method: 'GET'
  })
}

/**
 * 文件备份
 */
export function copyFile(): Promise<{}> {
  return request({
    url: `${prefix.manage}/systemInfo/copyFile`,
    method: 'GET'
  })
}

/**
 * 数据库备份
 */
export function findRecords(): Promise<{}> {
  return request({
    url: `${prefix.manage}/backup/findRecords`,
    method: 'GET'
  })
}


/**
 * 系统访问日志
 */
export function loginInfor(params: object = {}): Promise<{}> {
  return request({
    url: `${prefix.system}/logininfor/list`,
    method: 'GET',
    noLoading: true,
    params: {
      sortOrder: 'desc',
      sortField: 'loginTime',
      ...params
    }
  })
}

/**
 * 删除登录日志
 */
export function logininforRemove(ids: number | string): Promise<{}> {
  return request({
    url: `${prefix.system}/logininfor/remove?ids=${ids}`,
    method: 'POST'
  })
}

/**
 * 清空登录日志
 */
 export function logininforClean(): Promise<{}> {
  return request({
    url: `${prefix.system}/logininfor/clean`,
    method: 'POST'
  })
}

/**
 *操作日志列表
 */
export function operLogList(params: object = {}): Promise<{}> {
  return request({
    url: `${prefix.system}/operLog/list`,
    method: 'PATCH',
    noLoading: true,
    params: {
      sortOrder: 'desc',
      sortField: 'operTime',
      ...params
    }
  })
}

/**
 * 删除操作日志
 */
export function operLogRemove(ids: number | string): Promise<{}> {
  return request({
    url: `${prefix.system}/operLog/remove?ids=${ids}`,
    method: 'POST'
  })
}

/**
 * 清空操作日志
 */
 export function operLogClean(): Promise<{}> {
  return request({
    url: `${prefix.system}/operLog/clean`,
    method: 'POST'
  })
}