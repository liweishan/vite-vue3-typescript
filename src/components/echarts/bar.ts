import { Vue, Options, prop } from 'vue-class-component'
import { $emit } from 'vue-happy-bus'
import * as echarts from 'echarts/core'
// import { ToolboxComponent,
//   TooltipComponent,
//   GridComponent,
//   LegendComponent } from 'echarts/components'

import { GridComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'

echarts.use([BarChart, GridComponent, UniversalTransition])

class Props {
  series = prop({
    type: Array,
    required: true
  })

  xAxis = prop({
    type: Object,
    default: {}
  })

  xType = prop({
    type: String,
    default: 'category'
  })

  xData = prop({
    type: Array,
    default: []
  })

  yAxis = prop({
    type: Object,
    default: {}
  })

  yType = prop({
    type: String,
    default: 'value'
  })

  unit = prop({
    type: String,
    default: ''
  })
}

@Options({
  inject: ['id']
})
export default class Bar extends Vue.with(Props) {
  declare id: string
  render() {
    return
  }

  mounted() {
    this.emit()
    this.$watch('series', this.emit, { deep: true })
    this.$watch('xAxis', this.emit, { deep: true })
    this.$watch('xData', this.emit, { deep: true })
    this.$watch('yAxis', this.emit, { deep: true })
  }

  private emit() {
    const { series, xAxis, yAxis } = this

    const option = {
      series,
      yAxis: {
        ...this.getYAxis(),
        ...yAxis
      },
      xAxis: {
        ...this.getXAxis(),
        ...xAxis
      }
    }
    $emit(`${this.id}-init`, option)
  }

  private getXAxis() {
    return {
      type: this.xType,
      data: this.xData
    }
  }

  private getYAxis() {
    return {
      type: this.yType,
      axisLabel: {
        formatter: `{value} ${this.unit}`
      }
    }
  }
}