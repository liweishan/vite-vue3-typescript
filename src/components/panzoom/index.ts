import { createVNode } from 'vue'
import { Vue, prop } from 'vue-class-component'
import panzoom from 'panzoom'

class Props {
  id = prop({
    type: String,
    default: 'panzoom' 
  })
}

interface IPanzoom {
	dispose: Function
	moveBy: Function
	moveTo: Function
	smoothMoveTo: Function
	centerOn: Function
	zoomTo: Function
	zoomAbs: Function
	smoothZoom: Function
	smoothZoomAbs: Function
	showRectangle: Function
	pause: Function
	resume: Function
	isPaused: Function
	getTransform: Function
	getMinZoom: Function
	setMinZoom: Function
	getMaxZoom: Function
	setMaxZoom: Function
	getTransformOrigin: Function
	setTransformOrigin: Function
	getZoomSpeed: Function
	setZoomSpeed: Function
	on: Function
	off: Function
	fire: Function
}
interface ITransform {
	scale: number;
	x: number;
	y: number;
}
export default class Panzoom extends Vue.with(Props) {
  private instance: IPanzoom | null = null

  render() {
    return createVNode('div', {
      id: this.id,
      class: {
        panzoom: true
      }
    },
    this.$slots
    )
  }

  mounted() {
    const element = document.getElementById(this.id)
    this.instance = panzoom(element, {
      maxZoom: 10,
      minZoom: 1,
      filterKey: (e: Event) => {
        console.log(e)
        const filterCodes = [37, 38, 39, 40]
        const transform: ITransform = this.getTransform()
        // 当缩放等级为最小等级，且按下的键盘是左、上、右、下就禁止掉
        if (filterCodes.includes(e.keyCode) && transform?.scale === 1) {
          return true
        }
      },
      beforeMouseDown: () => {
        const transform: ITransform = this.getTransform()
        // 缩放为最小值的时候禁用平移
        return transform?.scale === 1
      },
      beforeWheel: (e) => {
        return !e.altKey
      }
    })
    this.instance.on('zoom', (ctx: IPanzoom) => {
      const transform: ITransform = ctx.getTransform()
      if (transform.scale === 1) {
        this.moveTo()
      }
    })
  }

  beforeUnmount() {
    this.dispose()
  }

  public dispose() {
    this.instance?.dispose()
    this.instance = null
  }

  public moveTo(x: number = 0, y: number = 0) {
    this.instance?.moveTo(x, y)
  }

  public getTransform(): ITransform | null {
    return this.instance?.getTransform()
  }
}