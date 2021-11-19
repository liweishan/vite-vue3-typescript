<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="user.name"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="user.ageGroup"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Form, Field, CellGroup } from 'vant'

interface User {
  name: string
  ageGroup: string
  sex: string
  region: string
  education: string
}

@Options({
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup
  }
})
export default class FormList extends Vue {
  private user!: User
}
</script>
