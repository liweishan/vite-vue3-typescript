<template>
  <a-modal
    :visible="visible"
    :title="title"
    width="660px"
    cancel-text="取消"
    ok-text="确认"
    :maskClosable="false"
    @cancel="cancel"
    @ok="handleOk"
  >
    <a-form
      ref="formRef"
      class="form-item-flex form-item-half"
      id="form"
      :model="formState"
      :rules="rules"
      :label-col="{ style: { width: '120px' } }"
    >
      <a-form-item label="上级权限" name="parentId">
        <a-select v-model:value="formState.parentId" :getPopupContainer="getContainer">
          <a-select-option :value="0">无</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="菜单类型" name="menuType">
        <a-select v-model:value="formState.menuType" :getPopupContainer="getContainer">
          <a-select-option v-for="(v, k) in menuTypeKey" :value="k" :key="k">{{ v }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="权限名称" name="menuName">
        <a-input v-model:value="formState.menuName" allow-clear placeholder="取一个名字" />
      </a-form-item>
      <a-form-item label="唯一路由键" name="menuKey">
        <a-input v-model:value="formState.menuKey" allow-clear placeholder="路由唯一键：如user" />
      </a-form-item>
      <a-form-item label="权限标识" name="perms" v-if="formState.menuType !== 'M'">
        <a-select v-model:value="formState.perms" placeholder="权限标识" :getPopupContainer="getContainer">
          <a-select-option v-for="(v, i) of permsList" :value="v.perms" :key="i">{{ v.permsName }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="组件" name="component" v-if="formState.menuType !== 'F'">
        <a-input v-model:value="formState.component" allow-clear placeholder="组件" />
      </a-form-item>
      <a-form-item label="图标" name="icon" v-if="formState.menuType !== 'F'">
        <a-input v-model:value="formState.icon" allow-clear placeholder="图标名称" @click="handleInput" />
      </a-form-item>
      <a-form-item label="打开方式" name="target" v-if="formState.menuType === 'C'">
        <a-select v-model:value="formState.target" :getPopupContainer="getContainer">
          <a-select-option value="">当前窗口</a-select-option>
          <a-select-option value="_blank">新窗口</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="链接地址" name="path" v-if="formState.menuType !== 'F'">
        <a-input v-model:value="formState.path" allow-clear placeholder="链接地址" />
      </a-form-item>
      <a-form-item label="重定向地址" name="redirect" v-if="formState.menuType !== 'F'">
        <a-input v-model:value="formState.redirect" allow-clear placeholder="重定向地址" />
      </a-form-item>
      <a-form-item label="高亮路径" name="acitveMenu">
        <a-input v-model:value="formState.acitveMenu" allow-clear placeholder="当前菜单高亮路径" />
      </a-form-item>
      <a-form-item label="显示顺序" name="orderNum">
        <a-input-number
          v-model:value="formState.orderNum"
          placeholder="显示顺序"
        />
      </a-form-item>
      <a-form-item label="隐藏子菜单" name="hiddenChildren" v-if="formState.menuType !== 'F'">
        <a-switch v-model:checked="formState.hiddenChildren" />
      </a-form-item>
      <a-form-item label="隐藏头部信息" name="hiddenHeader" v-if="formState.menuType !== 'F'">
        <a-switch v-model:checked="formState.hiddenHeader" />
      </a-form-item>
      <a-form-item label="状态" name="visible">
        <a-select v-model:value="formState.visible" placeholder="请选择" :getPopupContainer="getContainer">
          <a-select-option v-for="(v, k) in visibleKey" :key="k" :value="k">{{ v }}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <a-modal
      v-model:visible="isShow"
      title="选择图标"
      width="660px"
      :maskClosable="false"
      :footer="null"
    >
      <IconSelect :value="formState.icon"  @change="iconChange" />
    </a-modal>
  </a-modal>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import { Modal, Form, Input, Button, Select, Switch, InputNumber, message } from 'ant-design-vue'

import IconSelect from '@/components/IconSelector'


import { menuSave, menuUpdate, permsList } from 'api/system'

import { menuTypeKey, IMenuTypeKey, visibleKey } from 'data/system'
import { IForm, rules } from '../data'

const { Item } = Form
const { Option } = Select

class Props {
  visible = prop({
    type: Boolean,
    required: true
  })

  isAdd = prop({
    type: Boolean,
    required: true
  })
}


@Options({
  components: {
    [Modal.name]: Modal,
    [Form.name]: Form,
    [Item.name]: Item,
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    ASelectOption: Option,
    [Switch.name]: Switch,
    [InputNumber.name]: InputNumber,
    IconSelect
  },
  emits: ['success', 'update:visible']
})
export default class FormModal extends Vue.with(Props) {
  declare $refs: {
    formRef: any
  }
  private rules: object = rules

  private formState: IForm = {}
  private menuTypeKey: IMenuTypeKey = menuTypeKey
  private visibleKey = visibleKey
  private permsList: any[] = []
  private isShow: boolean = false

  private getContainer(): Element | null {
    const dom = document.getElementById('form')
    return dom || null
  }
  private cancel() {
    this.$emit('update:visible', false)
    this.$refs.formRef.clearValidate()
  }

  /**
   * 初始化表单数据
   */
  public initForm(data: IForm) {
    const keys: string[] = ['menuId', 'parentId', 'menuType', 'menuName', 'menuKey', 'perms', 'component', 'icon',
      'target', 'path', 'redirect', 'acitveMenu', 'hiddenChildren', 'hiddenHeader', 'orderNum', 'visible']
    this.formState = {}
    for (const [k, v] of Object.entries(data)) {
      if (keys.includes(k)) {
        this.formState[k] = v
      }
    }
    if (!this.permsList.length) {
      this.requestPermsList()
    }
  }

  private get title() {
    return this.isAdd ? '新增' : '修改'
  }

  /**
   * 点击图标的input输入框
   */
  private handleInput() {
    this.isShow = true
  }
  /**
   * 请求按钮权限字段列表
   */
  private async requestPermsList() {
    try {
      const res: any = await permsList()
      this.permsList = res.data
    } catch(e) {
      this.permsList = []
    }
  }

  private async handleOk() {
    const { formState, isAdd } = this
    try {
      await this.$refs.formRef.validate()
      // 添加的时候把id删除掉
      if (isAdd) {
        delete formState.menuId
      }
      if (isAdd) {
        await menuSave(formState)
      } else {
        await menuUpdate(formState)
      }
      message.success(`${isAdd ? '添加' : '修改'}成功`)
      this.$emit('success')
      this.cancel()
    } catch(e) {
      // console.log(e)
    }
  }

  /**
   * 图标选中的事件
   */
  private iconChange(icon: string) {
    this.formState.icon = icon
    this.isShow = false
  }
}
</script>
