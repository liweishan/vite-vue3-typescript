// 全局公用数据
export interface IPaging {
  pageSize: number
  pageNum: number
  total?: number
}

export interface IByte {
  B: number
  K: number
  M: number
  G: number
  T: number
}

export const byteKey: IByte = {
  B: 1,
  K: 1024,
  M: Math.pow(1024, 2),
  G: Math.pow(1024, 3),
  T: Math.pow(1024, 4)
}