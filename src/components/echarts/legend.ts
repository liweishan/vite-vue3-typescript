import { Vue, Options, prop } from 'vue-class-component'
import { $emit } from 'vue-happy-bus'
import * as echarts from 'echarts/core'
import { LegendComponent } from 'echarts/components'

echarts.use([LegendComponent])

class Props {
  legend = prop({
    type: Object,
    default: {}
  })

  left = prop({
    type: String,
    default: 'left'
  })

  orient = prop({
    type: String,
    default: 'horizontal'
  })
}

@Options({
  inject: ['id']
})
export default class Legend extends Vue.with(Props) {
  declare id: string
  render() {
    return
  }

  mounted() {
    this.emit()
    this.$watch('legend', this.emit, { deep: true })
    this.$watch('left', this.emit, { deep: true })
  }

  private emit() {
    const legend = {
      left: this.left,
      orient: this.orient,
      ...this.legend
    }
    $emit(`${this.id}-init`, { legend })
  }
}