import { Vue, Options, prop } from 'vue-class-component'
import { createVNode } from 'vue'
import { $on } from 'vue-happy-bus'

import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'

import { debounce } from 'utils/util'

echarts.use([
  CanvasRenderer
])

class Props {
  id = prop({
    type: String,
    default: 'chart'
  })
  height = prop({
    type: String,
    default: '400px'
  })
}

@Options({
  provide() {
    return {
      id: this.id
    }
  }
})
export default class Chart extends Vue.with(Props) {
  private option: any = {}
  private chart: any = null
  private draw: Funtion | null = null

  created() {
    // 使用防抖解决多个数据更新时会同时触发该函数
    this.draw = debounce.call(this, () => {
      const chartDom = document.getElementById(this.id)
      if (!chartDom) {
        return
      }
      this.dispose()
      const myChart = echarts.init(chartDom)
      
      myChart.setOption(this.option)
      this.chart = myChart
    })

    $on(`${this.id}-init`, (option: object) => {
      this.option = {
        ...this.option,
        ...option
      }
      // 没有主数据不渲染
      const { option: { series } } = this
      if (!series || (Array.isArray(series) && !series.length) || (!Array.isArray(series) && !series.data) || (Array.isArray(series.data) && !series.data.length)) {
        this.dispose()
        return
      }

      this.draw()
    })
  }

  mounted() {
    window.addEventListener('resize', this.resize)
  }

  render() {
    return createVNode('div', {
      id: this.id,
      class: {
        chart: true
      },
      style: {
        height: this.height
      }
    },
    this.$slots
    )
  }

  beforeUnmount() {
    window.removeEventListener('resize', this.resize)
    this.dispose()
  }

  public dispose() {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  }

  public resize() {
    this.chart && this.chart.resize()
  }
}