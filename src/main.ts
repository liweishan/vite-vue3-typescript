import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as directive from 'utils/directive'

import 'styles/base.less'
import 'styles/atom.less'
// 不需要mock就注释掉
import './mock'
import './permission'
// import 'default-passive-events'

const app = createApp(App)
app.use(store).use(router).mount('#app')

for (const k in directive) {
    app.directive(k, directive[k]())
}
