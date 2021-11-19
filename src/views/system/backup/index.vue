<template>
  <div class="backup form-item-flex">
    <div class="card">
      <a-row>
        <a-col :xl="12" :sm="24" :xs="24">
          <v-chart>
            <v-legend orient="vertical" />
            <v-pie :data="pieData" />
            <v-title text="磁盘空间总览" />
            <v-tooltip  :unit="unit" />
          </v-chart>
        </a-col>
        <a-col :xl="12" :sm="24" :xs="24">
          <v-chart id="bar">
            <v-legend />
            <v-bar :series="barSeries" :x-data="xData" :unit="unit" />
            <v-title text="磁盘空间详情" />
            <v-tooltip trigger="axis" :unit="unit" />
          </v-chart>
        </a-col>
      </a-row>
    </div>
    <div class="card">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="{ style: { width: '120px' } }"
      >
        <a-form-item label="数据库备份地址" name="databaseBackupAddr">
          <a-input v-model:value="formState.databaseBackupAddr"  />
        </a-form-item>
        <a-form-item label="文件备份地址" name="fileBackupAddr">
          <a-input v-model:value="formState.fileBackupAddr" />
        </a-form-item>
        <a-form-item label="文件上传地址" name="fileUploadAddr">
          <a-input v-model:value="formState.fileUploadAddr" />
        </a-form-item>
        <a-form-item label="是否开启配置" name="useState">
          <a-select v-model:value="formState.useState">
            <a-select-option v-for="(v, k) in stateKyes" :key="k" :value="k">{{ v }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="备注" name="remarks">
          <a-textarea v-model:value="formState.remarks" allow-clear :rows="4" />
        </a-form-item>
        
        <a-form-item>
          <a-button style="margin-left: 120px;" type="primary" :loading="loading" @click="handleSubmit">提交</a-button>
          <a-button style="margin-left: 10px" @click="handleReset">重置</a-button>
          <a-button style="margin-left: 10px" @click="copyFile">文件备份</a-button>
          <a-button style="margin-left: 10px" @click="findRecords">数据库备份</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.backup {
  .card {
    padding: 20px 40px;
    background: #fff;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}

</style>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Form, Input, Button, Select, message, Col, Row } from 'ant-design-vue'
import { stateKyes, rules, spaceKey, IForm, ISpace } from './data'
import { getSystemConfig, addSystemConfig, updateSystemConfig, getLocalDiskInfo, copyFile, findRecords } from 'api/system'

import { VChart, VPie, VLegend, VTitle, VTooltip, VBar } from 'coms/echarts'

import { getByteUnit, getByte } from 'utils/util'

const { Item } = Form
const { TextArea } = Input
const { Option } = Select

@Options({
  components: {
    [Form.name]: Form,
    [Item.name]: Item,
    [Input.name]: Input,
    [Button.name]: Button,
    [TextArea.name]: TextArea,
    [Select.name]: Select,
    [Col.name]: Col,
    [Row.name]: Row,
    ASelectOption: Option,
    VChart,
    VPie,
    VLegend,
    VTitle,
    VTooltip,
    VBar
  }
})
export default class Backup extends Vue {
  private formState: IForm = {}
  private rawData: IForm = {}
  private stateKyes = stateKyes
  private rules = rules
  private unit: string = ''
  private pieData: any[] = []

  private xData: string[] = []

  private barSeries: any[] = []

  private loading: boolean = false

  declare $refs: {
    formRef: any
  }

  created() {
    this.requestSystemConfig()
    this.getDiskInfo()
  }

  private async requestSystemConfig() {
    try {
      const res: any = await getSystemConfig()
      const data = res.data || {}
      this.formState = data
      this.rawData = {
        ...data
      }
    } catch(e) {
      // 
    }
  }

  private async getDiskInfo() {
    try {
      const res: any = await getLocalDiskInfo()
      const data: any = res.data || {}
      const unit = this.getUnit(data)
      this.unit = unit
      const pieData: any[] = []
      const barSeries: any[] = []
      for (const [k, v] of Object.entries(data)) {
        this.xData.unshift(`${k}盘`)
        for (const [key, e] of Object.entries(spaceKey)) {
          const space = (v as ISpace)[key] || 0
          const value = getByte(space, false, unit)
          const idx = pieData.findIndex((item: any) => item.name === e)
          if (idx > -1) {
            pieData[idx].value += space
          } else {
            pieData.push({
              name: e,
              value: space
            })
          }

          const index = barSeries.findIndex((item: any) => item.name === e)
          if (index > -1) {
            barSeries[index].data.unshift(value)
          } else {
            barSeries.push({
              name: e,
              type: 'bar',
              data: [value]
            })
          }
        }
      }
      this.pieData = pieData.reduce((arr: any[], v: any) => {
        v.value = getByte(v.value, false, unit)
        arr.push(v)
        return arr
      }, [])
      this.barSeries = barSeries
    } catch(e) {
      // 
    }
  }

  private getUnit(data: any) {
    let maxValue = 0
    for (const v of Object.values(data)) {
      for (const key of Object.keys(spaceKey)) {
        const value = (v as any)[key] || 0
        if (maxValue < value) {
          maxValue = value
        }
      }
    }
    return getByteUnit(maxValue).unit
  }

  private async handleSubmit() {
    this.loading = true
    const { formState } = this
    try {
      await this.$refs.formRef.validate()
      if (!formState.id) {
        await addSystemConfig(formState)
      } else {
        await updateSystemConfig(formState)
      }
      message.success(`${formState.id ? '修改' : '添加'}成功`)
      
      // 成功之后更新表单
      this.$emit('success')
    } catch(e) {
      // console.log(e)
    } finally {
      this.loading = false
    }
  }

  private handleReset() {
    this.$refs.formRef.resetFields()
    this.formState = {
      ...this.rawData
    }
  }

  /**
   * 请求接口文件备份
   */
  private async copyFile() {
    try {
      await copyFile()
      message.success('文件备份成功')
    } catch(e) {
      // 
    }
  }

  /**
   * 请求接口数据库备份
   */
  private async findRecords() {
    try {
      await findRecords()
      message.success('数据库备份成功')
    } catch(e) {
      // 
    }
  }
}
</script>
