import * as antIcons from '@ant-design/icons-vue'

export default function getAntIcons(filter: string[] = [], suffix: string = '') {
  if (!filter.length) {
    return antIcons
  }
  return filter.reduce((icons: any, v: string) => {
    const key = `${v}${suffix}`
    const item = Object.keys(antIcons).find(e => key === e)
    if (item) {
      icons[key] = (antIcons as any)[key]
    }
    return icons
  }, {})
}
