<template>
  <div class="ant-pro-icon-selector">
    <a-tabs :activeKey="currentTab" @change="handleTabChange">
      <a-tab-pane v-for="v in icons" :tab="v.title" :key="v.key">
        <ul class="anticons-list">
          <li v-for="(icon, key) in v.icons" :key="`${v.key}-${key}`" :class="{ 'active': selectedIcon === icon + 'Outlined' }" @click="handleSelectedIcon(icon + 'Outlined')" >
            <component :is="icon + 'Outlined'" />
          </li>
        </ul>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import { Tabs } from 'ant-design-vue'

import icons, { getIcons } from './icon'
import getAntIcons from 'utils/anticon'

const { TabPane } = Tabs

class Props {
  value = prop({
    type: String
  })
}

@Options({
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    ...getAntIcons(getIcons(), 'Outlined')
  },
  emits: ['change']
})
export default class IconSelect extends Vue.with(Props) {
  private selectedIcon: string = ''
  private icons: any[] = icons
  private currentTab: string = 'directional'

  created() {
    if (this.value) {
      this.autoSwitchTab()
    }
    this.$watch('value', (value: string) => {
      this.selectedIcon = value
      this.autoSwitchTab()
    })
  }

  private handleTabChange(key: string) {
    this.currentTab = key
  }

  private handleSelectedIcon(icon: string) {
    this.selectedIcon = icon
    this.$emit('change', icon)
  }

  private autoSwitchTab () {
    this.icons.some(item => item.icons.some((icon: string) => icon + 'Outlined' === this.value) && (this.currentTab = item.key) && (this.selectedIcon = this.value || ''))
  }
}
</script>

<style lang="less" scoped>
  ul {
    list-style: none;
    padding: 0;
    overflow-y: auto;
    height: 250px;
    li {
      display: inline-block;
      padding: 12px;
      margin: 3px 0;
      border-radius: 2px;

      &:hover, &.active{
        // box-shadow: 0px 0px 5px 2px @primary-color;
        cursor: pointer;
        color: #fff;
        background-color: @primary-color;
      }
      :deep(.anticon) {
        font-size: 36px;
      }
    }
  }
</style>