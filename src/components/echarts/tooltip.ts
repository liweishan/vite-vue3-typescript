import { Vue, Options, prop } from 'vue-class-component'
import { $emit } from 'vue-happy-bus'
import * as echarts from 'echarts/core'
import { TooltipComponent } from 'echarts/components'

echarts.use([TooltipComponent])

class Props {
  tooltip = prop({
    type: Object,
    default: {}
  })

  trigger = prop({
    type: String,
    default: 'item' 
  })

  unit = prop({
    type: String,
    default: ''
  })
}

@Options({
  inject: ['id']
})
export default class Tooltip extends Vue.with(Props) {
  declare id: string
  
  render() {
    return
  }
  
  mounted() {
    this.emit()
    this.$watch('tooltip', this.emit, { deep: true })
  }
  
  private item() {
    return {
      trigger: 'item',
      formatter: (params: any) => {
        const relVal = `${params.marker}${params.name}&nbsp;&nbsp;<b>${params.value}${this.unit}</b>`
        return relVal
      }
    }
  }

  private axis() {
    return {
      trigger: 'axis',
      formatter: (params: any[]) => {
        let relVal = params.reduce((relVal: string, v) => {
          relVal += `<br />${v.marker}${v.seriesName}&nbsp;&nbsp;<b>${v.value}${this.unit}</b>`
          return relVal
        }, '')
        relVal = params[0].name + relVal
        return relVal
      }
    }
  }
  
  private emit() {
    $emit(`${this.id}-init`, { tooltip: this.getTooltip() })
  }

  private getTooltip() {
    const { trigger, tooltip } = this
    const triggerObj = trigger === 'axis' ? this.axis() : this.item()
    return {
      ...triggerObj,
      ...tooltip
    }
  }
}