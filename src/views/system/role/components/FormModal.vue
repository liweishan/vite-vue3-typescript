<template>
  <a-modal
    :visible="visible"
    :title="title"
    width="560px"
    cancel-text="取消"
    ok-text="确认"
    :maskClosable="false"
    :confirmLoading="loading"
    @cancel="cancel"
    @ok="handleOk"
  >
    <a-form
      ref="formRef"
      class="form-item-flex"
      id="form"
      :model="formState"
      :rules="rules"
      :label-col="{ style: { width: '90px' } }"
    >
      <a-form-item label="角色名称" name="roleName">
        <a-input v-model:value="formState.roleName" allow-clear placeholder="用户名" />
      </a-form-item>
      <a-form-item label="权限字符" name="roleKey">
        <a-input v-model:value="formState.roleKey" allow-clear placeholder="登录的账号名" />
      </a-form-item>
      <a-form-item label="显示顺序" name="roleSort">
        <a-input-number
          v-model:value="formState.roleSort"
          placeholder="显示顺序"
        />
      </a-form-item>
      <a-form-item label="状态" name="status">
        <a-select v-model:value="formState.status" :getPopupContainer="getContainer" placeholder="请选择状态">
          <a-select-option v-for="(v, k) in userStatusKey" :key="k" :value="k">{{ v }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="拥有权限" name="menuIds">
        <a-tree
          :tree-data="menuTree"
          checkable
          check-strictly
          :replace-fields="replaceFields"
          v-model:checkedKeys="formState.menuIds"
          v-model:expandedKeys="expandedKeys"
          @check="check"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import { Modal, Form, Input, Button, Select, InputNumber, Tree, message } from 'ant-design-vue'

import { UserModule } from 'store/modules/user'

import { roleSave, roleUpdate, getMenuRole } from 'api/system'

import { getTree } from 'utils/util'
import { userStatusKey, sexKey, IStatus } from 'data/system'
import { rules, IForm, replaceFields } from '../data'

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
    [InputNumber.name]: InputNumber,
    [Tree.name]: Tree
  },
  emits: ['success', 'update:visible']
})
export default class FormModal extends Vue.with(Props) {
  declare $refs: {
    formRef: any
  }
  private rules: object = rules

  private formState: IForm = {}
  private userStatusKey: IStatus = userStatusKey
  private sexKey: IStatus = sexKey
  private roleList: any[] = []
  private loading: boolean = false
  private replaceFields = replaceFields
  private expandedKeys: number[] = []

  private get title() {
    return this.isAdd ? '新增' : '修改'
  }

  private get menuTree() {
    return getTree(UserModule.routerInfo)
  }
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
  public initForm(data: IForm = {}) {
    const keys: string[] = ['roleId', 'roleName', 'roleKey', 'status', 'roleSort']
    this.formState = {}
    for (const [k, v] of Object.entries(data)) {
      if (keys.includes(k)) {
        this.formState[k] = v
      }
    }
    // 把树节点全部闭合起来
    this.expandedKeys = []
    if (data.roleId || data.roleId === 0) {
      this.requestMenuRole(data.roleId)
    }
  }

  /**
   * 树组件复选框勾选事件
   */
  private check({ checked }: { checked: number[]}) {
    // 如果没有勾选就把表单的数据删除掉，否则会影响校验
    if (!checked.length) {
      delete this.formState.menuIds
    }
  }

  /**
   * 获取当前角色的菜单
   */
  private async requestMenuRole(roleId: number) {
    try {
      const list: any = await getMenuRole(roleId)
      const menuIds = list.reduce((arr: number[], v: any) => {
        arr.push(v.menuId)
        return arr
      }, [])
      
      this.formState.menuIds = {
        checked: menuIds
      }
    } catch(e) {
      this.formState.menuIds = {}
    }
  }

  private async handleOk() {
    const { formState, isAdd } = this
    // 添加的时候把id删除掉
    if (isAdd) {
      delete formState.roleId
    }
    const data = {
      ...formState,
      menuIds: (formState as any).menuIds?.checked
    }
    this.loading = true
    try {
      await this.$refs.formRef.validate()
      if (isAdd) {
        await roleSave(data)
      } else {
        await roleUpdate(data)
      }
      message.success(`${isAdd ? '添加' : '修改'}成功`)
      // 成功之后把事件分发到查询组件执行查询事件来更新数据
      this.$emit('success')
      this.cancel()
    } catch(e) {
      // console.log(e)
    } finally {
      this.loading = false
    }
  }
}
</script>
