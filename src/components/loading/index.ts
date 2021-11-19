import { createApp } from 'vue'
import { Spin } from 'ant-design-vue'

export default function loading(prop?: object, tag: string = 'body'): Function {
  const oBox = document.querySelector(tag)
  const cssStyle = window.getComputedStyle(oBox)
  if (tag !== 'body' &&  cssStyle.position === 'static') {
    oBox.style.position = 'relative'
  }
  const oDiv = document.createElement('div')
  oDiv.className = `${tag === 'body' ? 'p-fixed h-100vh' : 'p-absolute h-100'} t-0 l-0 w-100 d-flex ai-center jc-center`
  oDiv.style.zIndex = 9999
  const app = createApp(Spin, prop)
  app.mount(oDiv)
  oBox.appendChild(oDiv)

  return () => {
    app.unmount()
    oBox.removeChild(oDiv)
  }
}