<template>
  <a-modal
    :visible="visible"
    :title="title"
    width="460px"
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
      <a-form-item label="权限名称" name="permsName">
        <a-input v-model:value="formState.permsName" allow-clear placeholder="权限名称" />
      </a-form-item>
      <a-form-item label="权限标识" name="perms">
        <a-input v-model:value="formState.perms" allow-clear placeholder="权限标识" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import { Modal, Form, Input, Button, message } from 'ant-design-vue'

import { permsSave, permsUpdate } from 'api/system'

import { rules, IItem } from '../data'

const { Item } = Form

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
    [Button.name]: Button
  },
  emits: ['success', 'update:visible']
})
export default class FormModal extends Vue.with(Props) {
  declare $refs: {
    formRef: any
  }
  private rules: object = rules

  private formState: IItem = {}
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
  public initForm(data: IItem = {}) {
    const keys: string[] = ['id', 'permsName', 'perms']
    this.formState = {}
    for (const [k, v] of Object.entries(data)) {
      if (keys.includes(k)) {
        this.formState[k] = v
      }
    }
  }

  private async handleOk() {
    const { formState, isAdd } = this
    // 添加的时候把id删除掉
    if (isAdd) {
      delete formState.id
    }
    this.loading = true
    try {
      await this.$refs.formRef.validate()
      if (isAdd) {
        await permsSave(formState)
      } else {
        await permsUpdate(formState)
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
