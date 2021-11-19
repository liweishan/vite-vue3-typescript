import { Vue } from 'vue-class-component'

// import { getElement } from 'utils/dom'

export default class TableColumnWidth extends Vue {
  declare columns: any[]
  public setTableColumnWidth(id: string = 'table') {
    let oHeader = document.querySelector(`#${id} .ant-table-thead`)
    let oTbody = document.querySelector(`#${id} .ant-table-tbody`)
    if (!oHeader || !oTbody) {
      return
    }
    oHeader = Array.isArray(oHeader) ? oHeader[0] : oHeader
    oTbody = Array.isArray(oTbody) ? oTbody[0] : oTbody
    const aTh: any = oHeader.children[0].children
    const aTd: any = oTbody.children[0].children
    const check = document.querySelector(`#${id} .ant-table-thead .ant-checkbox-wrapper`)
    for (const i of Array.from(aTh).keys()) {
      // 有复选框就跳过下标为0
      if (check && i === 0) {
        continue
      }
      const width = this.columns[check ? i - 1 : i].width || 180
      const tdWidth = aTd[i].clientWidth
      const thWidth = aTh[i].children[0].clientWidth
      // 设置表格的头部与内容宽度对齐，减掉32的左右padding
      if (thWidth < width && tdWidth < width) {
        aTd[i].style.minWidth = width + 'px'
        aTh[i].children[0].style.minWidth = width - 32 + 'px'
      } else if (thWidth >= tdWidth) {
        aTd[i].style.minWidth = thWidth + 32 + 'px'
      } else {
        aTh[i].children[0].style.minWidth = tdWidth - 32 + 'px'
      }
    }
  }
}