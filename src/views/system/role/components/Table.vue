<template>
  <div class="search-bar clearfix">
    <div v-action:add class="item">
      <a-button type="primary" @click="handleAdd">
        <template #icon>
          <plus-outlined />
        </template>
        新增
      </a-button>
    </div>
    <div v-action:delete class="item" v-show="!!selectedRowKeys.length">
      <a-button type="primary" danger @click="handleDelete()">
        <template #icon>
          <delete-outlined />
        </template>
        删除
      </a-button>
    </div>
    <template v-action:search>
      <div class="item">
        <div class="label">
          角色名称:
          <div class="val">
            <a-input v-model:value="search.roleName" allow-clear placeholder="请输入" @pressEnter="requestList" />
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
        <a-button type="primary" @click="requestList">查询</a-button>
      </div>
      <div class="item ml10">
        <a-button @click="handleReset">重置</a-button>
      </div>
    </template>
  </div>
  <div class="table-box-scroll f-1 o-hidden">
    <a-table
      :dataSource="dataList"
      :columns="columns"
      rowKey="roleId"
      :pagination="false"
      :scroll="{y: true, x: true}"
      :rowSelection="{onChange: onChange}"
      :loading="loading"
    >
      <template #action="{ record }">
        <span v-action:edit class="ant-btn-link c-pointer mr-20" @click="handleEdit(record)">编辑</span>
        <span v-action:delete class="ant-btn-link c-pointer" @click="handleDelete(record)">删除</span>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { createVNode } from 'vue'
import { Vue, Options } from 'vue-class-component'
import { Table, Modal, Input, Button, Select, message } from 'ant-design-vue'
import { ExclamationCircleOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'

import { roleList, roleRemove } from 'api/system'

import { userStatusKey } from 'data/system'
import { IItem, columns, ISearch } from '../data'

const { Option } = Select

@Options({
  components: {
    [Table.name]: Table,
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    ASelectOption: Option,
    PlusOutlined,
    DeleteOutlined
  },
  emits: ['clickOption']
})
export default class MyTable extends Vue {
  private dataList: IItem[] = []
  private columns = columns
  private userStatusKey = userStatusKey

  private selectedRowKeys: number[] = []
  private search: ISearch = {}
  private loading: boolean = false

  created() {
    this.requestList()
  }
  
  beforeUnmount() {
    Modal.destroyAll()
  }

  /**
   * 点击重置搜索栏
   */
  private handleReset() {
    this.search = {}
  }

  /**
   * 请求用户数据
   */
  public async requestList() {
    this.loading = true
    try {
      const res: any = await roleList(this.search)
      const list: IItem[] = res.rows || []
      for (const v of list.values()) {
        v.statusText = userStatusKey[v.status || '']
      }
      this.dataList = list
    } catch(e) {
      this.dataList = []
    }
    this.loading = false
  }

  /**
   * 点击表格操作的编辑
   */
  private handleEdit(row: IItem) {
    this.$emit('clickOption', row, false)
  }

  /**
   * 点击表格操作的添加
   */
  private handleAdd() {
    this.$emit('clickOption')
  }

  /**
   * 点击表格操作的删除
   */
  private handleDelete(row?: IItem) {
    console.log(row)
    const ids = row?.roleId ? `${row.roleId}` : this.selectedRowKeys.join()
    const modal = Modal.confirm({
      title: '您确定要删除吗?',
      icon: createVNode(ExclamationCircleOutlined),
      content: '该操作不可逆，请谨慎操作',
      okText: '是',
      cancelText: '否',
      onOk: async () => {
        try {
          await roleRemove(ids)
          message.success('删除成功')
          this.requestList()
          this.selectedRowKeys = []
        } finally {
          modal.destroy()
        }
      },
      onCancel() {
        modal.destroy()
      }
    })
  }

  /**
   * 表格复选框选项改变的事件
   * @param {Array} selectedRowKeys 当前选中的rowKey集合
   */
  private onChange(selectedRowKeys: number[]) {
    this.selectedRowKeys = selectedRowKeys
  }
}
</script>
