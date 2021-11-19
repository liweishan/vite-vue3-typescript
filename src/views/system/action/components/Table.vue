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
    <div class="item" v-action:delete v-show="!!selectedRowKeys.length">
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
          权限名称:
          <div class="val">
            <a-input v-model:value="search.permsName" allow-clear placeholder="请输入" @pressEnter="requestList" />
          </div>
        </div>
      </div>
    <div class="item">
        <div class="label">
          权限标识:
          <div class="val">
            <a-input v-model:value="search.perms" allow-clear placeholder="请输入" @pressEnter="requestList" />
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
      rowKey="id"
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
import { Table, Modal, Input, Button, message } from 'ant-design-vue'
import { ExclamationCircleOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'

import { permsList, permsRemove } from 'api/system'

import { IItem, columns } from '../data'


@Options({
  components: {
    [Table.name]: Table,
    [Input.name]: Input,
    [Button.name]: Button,
    PlusOutlined,
    DeleteOutlined
  },
  emits: ['clickOption']
})
export default class MyTable extends Vue {
  private dataList: IItem[] = []
  private columns = columns
  private selectedRowKeys: number[] = []
  private search: IItem = {}
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
      const res: any = await permsList(this.search)
      this.dataList = res.data || []
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
    const ids = row?.id ? `${row.id}` : this.selectedRowKeys.join()
    const modal = Modal.confirm({
      title: '您确定要删除吗?',
      icon: createVNode(ExclamationCircleOutlined),
      content: '该操作不可逆，请谨慎操作',
      okText: '是',
      cancelText: '否',
      onOk: async () => {
        try {
          await permsRemove(ids)
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
