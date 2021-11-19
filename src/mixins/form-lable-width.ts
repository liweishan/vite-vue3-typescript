/**
 * 解决动态表单label宽度值超出label容器的问题
 */
import { Vue } from 'vue-class-component'

// import { getElement } from 'utils/dom'

export default class FormLabelWidth extends Vue {
  public setFormLableWidth(id: string = 'form') {
    let aLabel = document.querySelectorAll(`#${id} .ant-form-item-label`)
    if (!aLabel || !aLabel.length) {
      return
    }
    // aLabel = (Array.isArray(aLabel) ? aLabel : [aLabel])
    aLabel = Array.from(aLabel)
    // 如果有label宽度大于.ant-form-item-label容器的宽度，那么找出这个label最大的值，反之如果容器的间隔不足那么就加上10px，如果都满足就返回0
    const w = aLabel.reduce((maxWidth: number, v: Element) => {
      const w = v.clientWidth
      console.log(v.children)
      const childrenW = v.children[0].clientWidth
      // const finalW = childrenW + 10
      if ((childrenW + 10 > maxWidth && childrenW >= w) || childrenW + 10 > w) {
        maxWidth = childrenW + 10
      }

      return maxWidth
    }, 0)
    if (!w) {
      return
    }
    for (const v of aLabel.values()) {
      (v as any).style.width = w + 'px'
    }
  }
}