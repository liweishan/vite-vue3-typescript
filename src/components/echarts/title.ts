import { Vue, Options, prop } from 'vue-class-component'
import { $emit } from 'vue-happy-bus'
import * as echarts from 'echarts/core'
import { TitleComponent } from 'echarts/components'

echarts.use([TitleComponent])

class Props {
  title = prop({
    type: Object,
    default: {}
  })

  text = prop({
    type: String,
    default: ''
  })

  left = prop({
    type: String,
    default: 'center'
  })
}

@Options({
  inject: ['id']
})
export default class Title extends Vue.with(Props) {
  declare id: string
  render() {
    return
  }

  mounted() {
    this.emit()
    this.$watch('title', this.emit, { deep: true })
    this.$watch('text', this.emit, { deep: true })
    this.$watch('left', this.emit, { deep: true })
  }

  private emit() {
    $emit(`${this.id}-init`, { title: this.getTitle() })
  }

  private getTitle() {
    const { text, left, title } = this
    return {
      text,
      left,
      ...title
    }
  }
}