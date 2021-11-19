import { byteKey } from 'data/data'

/**
 * 生成随机数
 * @param min 最小值 
 * @param max 最大值
 * @returns 返回一个随机数
 */
export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * 
 * @returns 返回一个随机数 + 时间戳的字符串
 */
export function getUuid(): string {
  const num: number = random(10000000, 99999999)
  const time: number = Date.now()
  return `${num}${time}`
}
/**
 * 导出时间确定时间
 */
export function timeFix(): string {
  // 创建一个时间对象
  const time = new Date()
  // 赋值调用getHours方法
  const hour = time.getHours()
  // 返回时间小于9 早上好  小于11 上午好  小于13 中午好  小于20下午好' : '晚上好
  /** switch(true) {
    case hour < 9:
      return '美好的一天从爱华勘测开始'
    case hour <= 11:
      return '欢迎来到爱华勘测项目管理平台'
    case hour <= 13:
      return '爱华勘测精心设计、精准勘测、精致服务'
    case hour < 20:
      return '爱华勘测创造价值，成就理想；服务社会，报效国家'
    default:
      return '爱华温馨提醒各位员工早点休息'
  } */

  switch(true) {
    case hour < 12:
      return '早上好，欢迎来到潮南档案管理系统'
    case hour <= 18:
      return '下午好，欢迎来到潮南档案管理系统'
    case hour < 20:
      return '晚上好，欢迎来到潮南档案管理系统'
    default:
      return '欢迎来到潮南档案管理系统'
  }
}

/**
 * 获取对象里面的属性
 * @param obj 要获取值的对象
 * @param propertyKey 对象的属性，可以是a || a.b.c
 * @returns 最终得到的值
 */
export function getPropertyValue<T>(obj: T, propertyKey: string): any {
  const keyList = propertyKey.split('.')
  const result = keyList.reduce((obj: any, key: string) => {
    if (Object.prototype.toString.apply(obj) === '[object Object]' && obj[key]) {
      return obj[key]
    } else {
      return undefined
    }
  }, obj)

  return result
}

/**
 * 要去重的值
 * @param arr 一维数组
 * @returns 返回一个一维数组
 */
export function unique(arr: any[]): any[] {
  return Array.from(new Set(arr))
}

/**
 * 数组每一项为对象的去重
 * @param arr 数组
 * @returns 返回一个数组
 */
export function uniqueArray<T>(arr: T[], propertyKey: string): T[] {
  const data: T[] = []
  for (const v of arr.values()) {
    const val = getPropertyValue(v, propertyKey)
    const item = data.find(e => {
      const value = getPropertyValue(e, propertyKey)
      return value === val
    })
    if (!item) {
      data.push(v)
    }
  }

  return data
}

/**
 * 数据深拷贝
 */
export function getDeepCopy<T>(obj: T): T {
  if (typeof obj !== 'object' || !obj) {
    return obj
  }
  const newObj: any = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    newObj[key] = typeof obj[key] === 'object' ? getDeepCopy(obj[key]) : obj[key]
  }
  return newObj
}

/**
 * 把list数据组装成tree数据
 */
export function getTree(list: any[], idKey: string = 'menuId'): any[] {
  // 上面的方式必须要指定顶层id，所以选用后面的方式
  // return list.filter(v => {
  //   const child = list.filter(e => e.parentId === v.menuId)
  //   if (child.length) {
  //     v.children = child
  //   } else {
  //     delete v.children
  //   }

  //   if (!+v.parentId) {
  //     return v
  //   }
  // })
  for (const v of list.values()) {
    const child = []
    for (const e of list.values()) {
      if (v.menuId === 2024) {
        console.log(v)
      }
      if (e.parentId === v[idKey]) {
        child.push(e)
        // 标记一下，后面把有标记的过滤掉
        e.sign = true
      }
    }
    if (child.length) {
      v.children = child
    } else {
      delete v.children
    }
  }

  return list.filter(e => !+e.sign)
}

/**
 * 清除字符串两边的空格
 */
export function trim(val: string) {
  return val.replace(/^\s*|\s*$/g, '')
}

/**
 * 防抖
 */
export function debounce(fn: Function, delayed: number = 100): Function {
  let tid: any
  return () => {
    clearTimeout(tid)
    tid = setTimeout(() => {
      fn.apply(this, arguments)
    }, delayed)
  }
}

export interface IByteUnit {
  unit: string,
  byte: number
}

/**
 * 获取字节最大值单位
 */
export function getByteUnit(val: number): IByteUnit {
  let byte: number = 0,
    unit: string = 'B'
  for (const [k, v] of Object.entries(byteKey)) {
    const curByte = val / v
    if (curByte > 1 && (curByte < byte || !byte)) {
      byte = curByte
      unit = k
    }
  }
  return {
    unit,
    byte
  }
}

/**
 * 将字节转换成(K,M,G,T)，如果传了单位就按该单位计算
 */
export function getByte(val: number, isUnit?: boolean, unit?: string): string {
  if (unit && byteKey[unit]) {
    return `${getFloatNumber(val / byteKey[unit])}${isUnit ? unit : ''}`
  }
  const btyeUnit = getByteUnit(val)
  return `${getFloatNumber(btyeUnit.byte)}${isUnit ? btyeUnit.unit : ''}`
}

/**
 * 保留小数
 * @param val 要保留小数的值
 * @param digit 要保留小数的位数
 * @return
 */
export function getFloatNumber(val: number, digit: number = 2): number {
  return Math.floor(val * +`1e${digit}`) / +`1e${digit}`
}