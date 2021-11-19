<template>
  <div class="search-bar clearfix">
    <template v-action:search>
      <div class="item">
        <div class="label">
          操作人名称:
          <div class="val">
            <a-input v-model:value="search.operName" allow-clear placeholder="请输入" @pressEnter="handleSearch" />
          </div>
        </div>
      </div>
    <div class="item">
        <div class="label">
          登录时间:
          <div class="val">
            <a-range-picker v-model:value="search.startEndTime" show-time value-format="YYYY-MM-DD HH:mm:ss" allow-clear />
          </div>
        </div>
      </div>
      <div class="item">
        <a-button type="primary" @click="handleSearch">查询</a-button>
      </div>
      <div class="item ml10">
        <a-button @click="handleReset">重置</a-button>
      </div>
    </template>
    <div class="item" v-show="selectedRowKeys.length" v-action:delete>
      <a-button type="primary" danger @click="handleDelete()">
        <template #icon>
          <delete-outlined />
        </template>
        删除
      </a-button>
    </div>
    <div class="item" v-action:delete>
      <a-button type="primary" danger @click="handleClean">
        <template #icon>
          <delete-outlined />
        </template>
        清空日志
      </a-button>
    </div>
  </div>
  <div id="option-table" class="table-box-scroll f-1 o-hidden table-striped">
    <a-table
      :dataSource="dataList"
      :columns="columns"
      rowKey="operId"
      :pagination="false"
      :scroll="{y: true, x: true}"
      :row-selection="{ onChange: onSelectChange }"
      :loading="loading"
    >
      <template #action="{ record }">
        <span v-action:delete class="ant-btn-link c-pointer" @click="handleDelete(record)">删除</span>
      </template>
    </a-table>
  </div>
  <div class="pt-20 d-flex fd-rr">
    <a-pagination
      show-quick-jumper
      v-model:current="paging.pageNum"
      v-model:page-size="paging.pageSize"
      :total="paging.total"
      hide-on-single-page
      @change="requestList"
    />
  </div>
</template>

<script lang="ts">
import { createVNode } from 'vue'
import { Options, mixins } from 'vue-class-component'
import { Table, Button, Input, DatePicker, Pagination, Modal, message } from 'ant-design-vue'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'

import { columnsOption, statusKey, IOperLogList, IOperLogListResult } from '../data'
import { IPaging } from 'data/data'

import { operLogList, operLogClean, operLogRemove } from 'api/system'

import TableColumnWidth from 'mixins/table-column-width'

import moment from 'moment'
import 'moment/dist/locale/zh-cn'
moment.locale('zh-cn')

const { RangePicker } = DatePicker

interface ISearch {
  loginName?: string
  startEndTime?: string[]
}

@Options({
  components: {
    [Table.name]: Table,
    [Button.name]: Button,
    [Input.name]: Input,
    [RangePicker.name]: RangePicker,
    [Pagination.name]: Pagination,
    DeleteOutlined
  }
})
export default class OptionTable extends mixins(TableColumnWidth) {
  declare setTableColumnWidth: any
  private loading: Boolean = false
  public columns = columnsOption
  private dataList: IOperLogList[] = []
  private selectedRowKeys: number[] = []
  private search: ISearch = {}
  private paging: IPaging = this.getPaging()

  beforeUnmount() {
    Modal.destroyAll()
  }
  
  public init() {
    if (!this.dataList.length) {
      this.requestList()
    }
  }

  private getPaging(): IPaging {
    return {
      pageNum: 1,
      pageSize: 20,
      total: 0
    }
  }

  private handleSearch() {
    this.paging = this.getPaging()
    this.requestList()
  }

  private async requestList() {
    const { paging, search } = this
    const startEndTime = search.startEndTime || []
    const params = {
      ...paging,
      ...search,
      beginTime: startEndTime[0],
      endTime: startEndTime[1]
    }
    delete params.startEndTime
    delete params.total

    this.loading = true
    try {
      const res: IOperLogListResult = await operLogList(params)
      const list = res.rows || []
      this.dataList = list.reduce((arr: IOperLogList[], v: IOperLogList) => {
        v.statusText = statusKey[`${v.status}`]
        arr.push(v)
        return arr
      }, [])
      paging.total = res.total
      await this.$nextTick()
      this.setTableColumnWidth('option-table')
    } catch(e) {
      this.dataList = []
    }
    this.loading = false
  }

  private handleDelete(row: IOperLogList) {
    const ids = row ? row.operId : this.selectedRowKeys.join()
    if (!ids) {
      return
    }
    const modeal = Modal.confirm({
      title: `是否删除${row ? '该条' : '选中的'}日志？`,
      icon: createVNode(ExclamationCircleOutlined),
      content: '该操作不可逆，请谨慎操作！',
      okText: '确认',
      centered: true,
      onOk: async () => {
        await operLogRemove(ids)
        this.requestList()
        message.success('删除成功')
        modeal.destroy()
      },
      onCancel() {
        modeal.destroy()
      }
    })
  }

  private handleReset() {
    this.search = {}
  }
  
  private handleClean() {
    const modeal = Modal.confirm({
      title: '是否清空所有操作日志？',
      icon: createVNode(ExclamationCircleOutlined),
      content: '该操作不可逆，请谨慎操作！',
      okText: '确认',
      centered: true,
      onOk: async () => {
        await operLogClean()
        this.handleSearch()
        message.success('删除成功')
        modeal.destroy()
      },
      onCancel() {
        modeal.destroy()
      }
    })
  }

  private onSelectChange(selectedRowKeys: number[]) {
    this.selectedRowKeys = selectedRowKeys
  }
}
</script>
