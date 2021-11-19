import { Vue, Options, prop } from 'vue-class-component'
import { $emit } from 'vue-happy-bus'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'

echarts.use([PieChart, LabelLayout])

class Props {
  series = prop({
    type: Object,
    default: {}
  })

  radius = prop({
    type: [String, Number],
    default: 60
  })

  data = prop({
    type: Array,
    default: []
  })
}

@Options({
  inject: ['id']
})
export default class Pie extends Vue.with(Props) {
  declare id: string
  render() {
    return
  }

  mounted() {
    this.emit()
    this.$watch('series', this.emit, { deep: true })
    this.$watch('radius', this.emit, { deep: true })
    this.$watch('data', this.emit, { deep: true })
  }

  private emit() {
    const { data, radius, series } = this
    const option = {
      radius,
      data,
      ...series,
      type: 'pie'
    }
    $emit(`${this.id}-init`, { series: option })
  }
}