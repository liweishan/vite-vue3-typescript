<template>
  <!-- <div v-show="loading" class="p-fixed t-0 l-0 w-100 h-100vh d-flex ai-center jc-center">
    <a-spin type="spinner" color="#1989fa" />
  </div> -->
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Spin, ConfigProvider } from 'ant-design-vue'
import { AppModule } from 'store/modules/app'

import zhCN from 'ant-design-vue/es/locale/zh_CN'


@Options({
  components: {
    [Spin.name]: Spin,
    [ConfigProvider.name]: ConfigProvider
  }
})
export default class App extends Vue {
  private locale = zhCN
  private get loading() {
    return AppModule.loading
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.p-fixed {
  z-index: 9999;
}
</style>
