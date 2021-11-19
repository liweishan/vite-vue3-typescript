<template>
  <a-modal
    :visible="visible"
    :title="title"
    width="660px"
    cancel-text="取消"
    ok-text="确认"
    :maskClosable="false"
    :confirmLoading="loading"
    @cancel="cancel"
    @ok="handleOk"
  >
    <a-form
      ref="formRef"
      class="form-item-flex form-item-half"
      id="form"
      :model="formState"
      :rules="rules"
      :label-col="{ style: { width: '90px' } }"
    >
      <a-form-item label="用户名" name="userName">
        <a-input v-model:value="formState.userName" allow-clear placeholder="用户名" />
      </a-form-item>
      <a-form-item label="登录名" name="loginName">
        <a-input v-model:value="formState.loginName" allow-clear placeholder="登录的账号名" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input v-model:value="formState.password" type="password" allow-clear placeholder="输入密码" />
      </a-form-item>
      <a-form-item label="电话号码" name="phonenumber">
        <a-input v-model:value="formState.phonenumber" allow-clear placeholder="输入电话号码" />
      </a-form-item>
      <a-form-item label="邮箱" name="email">
        <a-input v-model:value="formState.email" allow-clear placeholder="输入邮箱" />
      </a-form-item>
      <a-form-item label="性别" name="sex">
        <a-select v-model:value="formState.sex" :getPopupContainer="getContainer" placeholder="请选择性别">
          <a-select-option v-for="(v, k) in sexKey" :key="k" :value="k">{{ v }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态" name="status">
        <a-select v-model:value="formState.status" :getPopupContainer="getContainer" placeholder="请选择状态">
          <a-select-option v-for="(v, k) in userStatusKey" :key="k" :value="k">{{ v }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="拥有角色" name="roleIds">
        <a-select v-model:value="formState.roleIds" mode="multiple" :getPopupContainer="getContainer" placeholder="请选择角色">
          <a-select-option v-for="(v, i) of roleList" :key="i" :value="v.roleId">{{ v.roleName }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="formState.remark" allow-clear :rows="4" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import { Modal, Form, Input, Button, Select, Switch, InputNumber, message } from 'ant-design-vue'

import { userSave, userUpdate, getUserRoles, roleAll } from 'api/system'

import { userStatusKey, sexKey, IStatus } from 'data/system'
import { rules, IForm } from '../data'

const { Item } = Form
const { Option } = Select
const { TextArea } = Input

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
    [TextArea.name]: TextArea,
    [Button.name]: Button,
    [Select.name]: Select,
    ASelectOption: Option,
    [Switch.name]: Switch,
    [InputNumber.name]: InputNumber
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

  private get title() {
    return this.isAdd ? '新增' : '修改'
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
    const keys: string[] = ['userId', 'userName', 'loginName',
     'email', 'phonenumber', 'status', 'roleIds', 'sex', 'remark']
    this.formState = {}
    for (const [k, v] of Object.entries(data)) {
      if (keys.includes(k)) {
        this.formState[k] = v
      }
    }
    // 只执行一次
    if (!this.roleList.length) {
      this.requestRoleAll()
    }

    // 修改的时候请求用户角色
    if (data.userId) {
      (this as any).rules.password.required = false
      this.requestUserRoles(data.userId)
    } else {
      (this as any).rules.password.required = true
    }
  }

  /**
   * 请求所有的角色
   */
  private async requestRoleAll() {
    try {
      const res: any = await roleAll()
      this.roleList = res.rows || []
    } catch(e) {
      this.roleList = []
    }
  }

  /**
   * 请求当前用户的角色
   */
  private async requestUserRoles(userId: number) {
    try {
      const res: any = await getUserRoles(userId)
      this.formState.roleIds = res.roleIds || []
    } catch(e) {
      // 
    }
  }
  private async handleOk() {
    const { formState, isAdd } = this
    // 添加的时候把id删除掉
    if (isAdd) {
      delete formState.userId
    }
    this.loading = true
    try {
      await this.$refs.formRef.validate()
      if (isAdd) {
        await userSave(formState)
      } else {
        await userUpdate(formState)
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
