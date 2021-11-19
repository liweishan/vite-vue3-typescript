<template>
  <div class="pdf-container">
    <div id="pdf-box" class="o-hidden">
      <component :is="panzoom ? 'Panzoom' : 'div'"  ref="panzoom">
        <canvas v-if="paging" :id="id"></canvas>
        <template v-else>
          <canvas v-for="pageIndex in pdfPages" :id="`${id}-${pageIndex}`" :key="pageIndex"></canvas>
        </template>
      </component>
    </div>
    <a-pagination v-if="paging" simple v-model:current="current" :pageSize="1" :total="pdfPages" @change="changePage" />
  </div>

</template>
<script lang="ts">
declare const window: any
import { Options, Vue, prop } from 'vue-class-component'
import { Pagination } from 'ant-design-vue'
import Panzoom from 'coms/panzoom'
import * as PdfJs from 'pdfjs-dist/legacy/build/pdf'
import worker from 'pdfjs-dist/build/pdf.worker.entry.js'

import { debounce } from 'utils/util'

// import { getFile } from 'api/archives'
// import pdfUrl from '@/assets/ceshi.pdf'

class Props {
  url = prop({
    type: String || null,
    default: null
  })
  id = prop({
    type: String,
    default: 'pdf-canvas'
  })
  paging = prop({
    type: Boolean,
    default: true
  })
  panzoom = prop({
    type: Boolean,
    default: true
  })
}

@Options({
  components: {
    [Pagination.name]: Pagination,
    Panzoom
  },
  emits: ['renderEnd']
})
export default class Pdf extends Vue.with(Props) {
  declare $refs : {
    panzoom: Panzoom
  }
  private pdfDoc: any = '' // 保存加载的pdf文件流
  private pdfPages = 0
  private current = 1
  private pdfScale = 1.0
  private debounce: Function | null = null
  mounted () {
    if (this.url) {
      this.loadFile(this.url)
    }
    this.$watch('url', () => {
      if (this.url) {
        this.current = 1
        this.loadFile(this.url)
      }
    }, { deep: true })
    window.addEventListener('keyup', this.keyup)
  
    this.debounce = debounce.call(this, () => {
      this.renderPage(this.current)
    }, 500)
  }

  beforeUnmount() {
    window.removeEventListener('keyup', this.keyup)
  }

  private keyup(e: Event | any): Function | any {
    const hasTarget = e.target.id === 'pdf-box'
    const transform = this.panzoom ? this.$refs.panzoom.getTransform() : false
    if (!this.paging || (hasTarget && transform && transform.scale !== 1)) {
      return
    }
    if (e.keyCode === 37 && this.current > 1) {
      this.current -= 1
    } else if (e.keyCode === 39 && this.current < this.pdfPages) {
      this.current += 1
    } else {
      return
    }
    this.debounce && this.debounce()
  }

  private loadFile<T>(url: T): void {
    PdfJs.GlobalWorkerOptions.workerSrc = worker
    const loadingTask = PdfJs.getDocument(url)
    loadingTask.promise.then((pdf) => {
      this.pdfDoc = pdf
      this.pdfPages = this.pdfDoc.numPages
      this.$nextTick(() => {
        this.renderPage(this.current) // 表示渲染第 1 页
      })
    })
  }

  private renderPage (num: number) {
    const { id, paging, pdfPages } = this
    this.pdfDoc.getPage(num).then((page: any) => {
      const canvasId = paging ? id : `${id}-${num}`
      const canvas: any = document.getElementById(canvasId)
      const ctx: any = canvas.getContext('2d')
      const dpr = window.devicePixelRatio || 1
      const bsr = ctx.webkitBackingStorePixelRatio ||
                  ctx.mozBackingStorePixelRatio ||
                  ctx.msBackingStorePixelRatio ||
                  ctx.oBackingStorePixelRatio ||
                  ctx.backingStorePixelRatio ||
                  1
      const ratio = dpr / bsr
      const viewport = page.getViewport({ scale: this.pdfScale })
      // A4纸宽度700
      const rate = viewport.width / 700
      const w = rate > 1 ? 700 : viewport.width
      const h = rate > 1 ? viewport.height / rate : viewport.height
      canvas.width = viewport.width * ratio
      canvas.height = viewport.height * ratio
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      }
      page.render(renderContext)
      // 在第num页渲染完毕后，递归调用renderPage方法，去渲染下一页，直到所有页面渲染完毕为止
      if (num < pdfPages && !paging) {
        this.renderPage(num + 1)
      } else {
        setTimeout(() => {
          this.$nextTick(() => {
            this.$emit('renderEnd')
          })
        }, 300)
      }
    })
  }

  private changePage(page: number) {
    this.renderPage(page)
  }

  private getObjectURL<T>(file: T): string {
      let url = null
      if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file)
      } else if (window.webkitURL != undefined) { // webkit or chrome
          try {
            url = window.webkitURL.createObjectURL(file)     
          } catch (error) {
            // 
          }
      } else if (window.URL != undefined) { // mozilla(firefox)
        try {
          url = window.URL.createObjectURL(file)
        } catch (error) {
          // 
        }
      }
      return url
    }

    private uint8Array(file: Blob) {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = (e: any) => {
        const uint8Array = new Uint8Array(e.target.result)
        this.loadFile(uint8Array)
      }
    }
}
</script>