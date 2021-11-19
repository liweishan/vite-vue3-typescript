import { existsSync, readFileSync } from 'fs'

/** 解析后环境变量 */
const config = getEnvConfig()

/** 读取环境变量文件 */
function getEnvConfig() {
  const path = existsSync('.env.development') ? '.env.development' : '.env.prod'
  console.log(existsSync('.env.development'))
  const content = readFileSync(path, 'utf-8')
  return parse(content)
}

/** 解析环境变量内容 */
function parse(string: string) {
  const obj: Record<string, string> = {}
  const regExp = '(\\S+)\\s*=\\s*(\\S+)' // 通过正则匹配符合 `A=b` 的结构。如果需要处理带引号的参数，可以优化正则为 `'(\\S+)\\s*=\\s*"(\\S+)"'` 适配双引号，单引号同理
  const list = string.match(new RegExp(regExp, 'g'))
  // 去除空格并组合为键值对
  list && list.forEach((item) => {
    const data = item.match(new RegExp(regExp))
    const key = data ? data[1].trim() : undefined
    const value = data ? data[2].trim() : undefined
    key && (obj[key] = value)
  })
  return obj
}

export default config