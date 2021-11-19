<template>
  <div class="search-bar clearfix">
    <template v-action:search>
      <div class="item">
        <div class="label">
          登录名称:
          <div class="val">
            <a-input v-model:value="search.loginName" allow-clear placeholder="请输入" @pressEnter="handleSearch" />
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
  <div id="table" class="table-box-scroll f-1 o-hidden table-striped">
    <a-table
      :dataSource="dataList"
      :columns="columns"
      rowKey="infoId"
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
import { Vue, Options } from 'vue-class-component'
import { Table, Button, Input, DatePicker, Pagination, Modal, message } from 'ant-design-vue'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'

import { columns, statusKey, ILoginInfor, ILoginInforResult } from '../data'
import { IPaging } from 'data/data'

import { loginInfor, logininforClean, logininforRemove } from 'api/system'

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
export default class LoginTable extends Vue {
  private loading: Boolean = false
  private columns = columns
  private dataList: ILoginInfor[] = []
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
      const res: ILoginInforResult = await loginInfor(params)
      const list = res.rows || []
      this.dataList = list.reduce((arr: ILoginInfor[], v: ILoginInfor) => {
        v.statusText = statusKey[v.status || '']
        arr.push(v)
        return arr
      }, [])
      paging.total = res.total
    } catch(e) {
      this.dataList = []
    }
    this.loading = false
  }

  private handleDelete(row: ILoginInfor) {
    const ids = row ? row.infoId : this.selectedRowKeys.join()
    console.log(ids)
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
        await logininforRemove(ids)
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
      title: '是否清空所有登录日志？',
      icon: createVNode(ExclamationCircleOutlined),
      content: '该操作不可逆，请谨慎操作！',
      okText: '确认',
      centered: true,
      onOk: async () => {
        await logininforClean()
        this.dataList = []
        this.paging = this.getPaging()
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
