<template>
  <div class="search-bar clearfix">
    <div v-action:add class="item">
      <a-button type="primary" @click="handleAddMenu">
        <template #icon>
          <plus-outlined />
        </template>
        新增
      </a-button>
    </div>
    <template v-action:search>
      <div class="item">
        <div class="label">
          唯一键:
          <div class="val">
            <a-input v-model:value="search.menuKey" allow-clear placeholder="请输入" @pressEnter="handleSearch" />
          </div>
        </div>
      </div>
      <div class="item">
        <div class="label">
          权限名称:
          <div class="val">
            <a-input v-model:value="search.menuName" allow-clear placeholder="请输入" @pressEnter="handleSearch" />
          </div>
        </div>
      </div>
      <div class="item">
        <div class="label">
          状态:
          <div class="val">
            <a-select v-model:value="search.visible" allow-clear placeholder="请选择">
              <a-select-option v-for="(v, k) in visibleKey" :key="k" :value="k">{{ v }}</a-select-option>
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
    </template>
  </div>
  <div class="table-box-scroll f-1 o-hidden">
    <a-table
      :dataSource="dataTree"
      :columns="columns"
      rowKey="menuId"
      :pagination="false"
      :scroll="{y: true, x: true}"
    >
      <template #action="{ record }">
        <span v-action:edit class="ant-btn-link c-pointer mr-20" @click="handleEdit(record)">编辑</span>
        <!-- 按钮级不能新增 -->
        <span v-action:add v-if="record.menuType !== 'F'" class="ant-btn-link c-pointer mr-20" @click="handleAdd(record)">新增</span>
        <span v-action:delete class="ant-btn-link c-pointer" @click="handleDelete(record)">删除</span>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { createVNode } from 'vue'
import { Vue, Options } from 'vue-class-component'
import { Table, Modal, Input, Button, Select, Divider, message } from 'ant-design-vue'
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { UserModule } from 'store/modules/user'

import { getTree, getDeepCopy } from 'utils/util'
import { menuRemove } from 'api/system'

import { menuTypeKey, visibleKey } from 'data/system'
import { IItem, columns, ISearch } from '../data'

const { Option } = Select

@Options({
  components: {
    [Table.name]: Table,
    [Divider.name]: Divider,
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    ASelectOption: Option,
    PlusOutlined
  },
  emits: ['clickOption']
})
export default class MyTable extends Vue {
  private dataTree: IItem[] = []

  private columns = columns
  private visibleKey = visibleKey

  private search: ISearch = {}


  created() {
    this.dataTree = this.getDataTree()
    // 表单新增或者修改成功
    // $on('success', this.success)
  }
  private handleSearch() {
    this.dataTree = this.getDataTree()
  }

  private handleAddMenu() {
    const data = {
      menuType: 'M',
      parentId: 0,
      visible: '0'
    }
    this.$emit('clickOption', data)
  }

  private handleReset() {
    this.search = {}
  }

  private getDataTree(): IItem[] {
    const list = getDeepCopy(UserModule.routerInfo)
    const { search: { menuKey, menuName, visible }} = this
    const newList = list.filter((v: IItem) => {
      if (
        (!menuKey || menuKey.toLocaleLowerCase() === v.menuKey?.toLocaleLowerCase())
        && (!menuName || v.menuName.indexOf(menuName) > -1)
        && (!visible || visible === v.visible)
      ) {
        v.menuTypeText = menuTypeKey[v.menuType]
        v.visibleText = visibleKey[v.visible]
        return v
      }
    })

    return getTree(newList)
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
  private handleAdd(row: IItem) {
    const data = {
      menuType: 'M',
      parentId: row.menuId,
      visible: '0'
    }
    this.$emit('clickOption', data)
  }

  /**
   * 点击表格操作的删除
   */
  private handleDelete(row: IItem) {
    const modal = Modal.confirm({
      title: '您确定要删除吗?',
      icon: createVNode(ExclamationCircleOutlined),
      content: '该操作不可逆，请谨慎操作',
      okText: '是',
      cancelText: '否',
      onOk: async () => {
        try {
          await menuRemove(row.menuId)
          message.success('删除成功')
          this.success()
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
   * 表单添加或者修改成功
   */
  public async success() {
    // 更新菜单列表
    try {
      await UserModule.GetRouterInfo()
    } finally {
      // 通知搜索栏执行查询事件来更新数据
      // $emit('search')
      this.dataTree = this.getDataTree()
    }
  }
}
</script>
