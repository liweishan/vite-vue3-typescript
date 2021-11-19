<template>
  <div class="log f-1 d-flex fd-column o-hidden">
    <a-tabs v-model:active-key="activeKey" @change="onChange">
      <a-tab-pane :key="1" tab="登录日志" />
      <a-tab-pane :key="2" tab="操作日志" />
    </a-tabs>
    <div class="f-1 d-flex fd-column o-hidden" v-show="activeKey === 1">
      <login-table ref="login" />
    </div>
    <div class="f-1 d-flex fd-column o-hidden" v-show="activeKey === 2">
      <option-table ref="option" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.log {
  background: #fff;
  padding: 20px;
  margin-bottom: 24px !important;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

</style>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Tabs } from 'ant-design-vue'
import { LoginTable, OptionTable } from './components'

const { TabPane } = Tabs

@Options({
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    LoginTable,
    OptionTable
  }
})
export default class Log extends Vue {
  declare $refs: {
    login: LoginTable,
    option: OptionTable
  }
  private formState: object = {}
  private activeKey: number = 1

  mounted() {
    this.onChange(this.activeKey)
  }

  private onChange(activeKey: number) {
    if (activeKey === 1) {
      this.$refs.login && this.$refs.login.init()
    } else {
      this.$refs.option && this.$refs.option.init()
    }
  }
}
</script>
