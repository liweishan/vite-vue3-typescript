<template>
  <div class="search-bar clearfix">
    <div class="item">
      <a-button type="primary" @click="handleAddUser">
        <template #icon>
          <plus-outlined />
        </template>
        新增
      </a-button>
    </div>
    <div class="item" v-show="isDelete">
      <a-button type="primary" danger @click="handleDeletes">
        <template #icon>
          <delete-outlined />
        </template>
        删除
      </a-button>
    </div>
    <div class="item">
      <div class="label">
        用户名:
        <div class="val">
          <a-input v-model:value="search.userName" allow-clear placeholder="请输入" @pressEnter="handleSearch" />
        </div>
      </div>
    </div>
    <div class="item">
      <div class="label">
        状态:
        <div class="val">
          <a-select v-model:value="search.status" allow-clear placeholder="请选择">
            <a-select-option v-for="(v, k) in userStatusKey" :key="k" :value="k">{{ v }}</a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <div class="item">
      <a-button type="primary" @click="handleSearch">查询</a-button>
    </div>
    <div class="item ml10">
      <a-button @click="handleReset">重置</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

import { Input, Button, Select } from 'ant-design-vue'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'

import { $emit, $on } from 'vue-happy-bus'

import { userStatusKey, IStatus } from 'data/system'
import { ISearch } from '../data'

const { Option } = Select

@Options({
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    ASelectOption: Option,
    PlusOutlined,
    DeleteOutlined
  }
})
export default class SearchBar extends Vue {
  private search: ISearch = {}
  private userStatusKey: IStatus = userStatusKey

  private isDelete: boolean = false

  created() {
    $on('search', this.handleSearch)
    $on('tableSelect', (length?: number) => {
      this.isDelete = !!length
    })
  }

  private handleSearch() {
    $emit('handleSearch', this.search)
  }

  private handleAddUser() {
    this.$emit('clickOption')
  }

  private handleReset() {
    this.search = {}
  }

  private handleDeletes() {
    $emit('delete')
  }
}
</script>
