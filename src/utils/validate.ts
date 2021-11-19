// 规则校验 2021/08/27 11:43
// 邮箱
export const email: RegExp = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/

// 手机号
export const phone: RegExp = /^1(3|4|5|6|7|8|9)([0-9]{9})/

// 座机号
export const tel: RegExp = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/

// 手机号或者座机号
export const phoneNumber: RegExp = /^(1(3|4|5|6|7|8|9)([0-9]{9})$)|(((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)/

// 非空
export const tirm: RegExp = /^(\S)+(\S|\s)+$/

// 字母
export const letter: RegExp = /^[a-zA-Z]+$/