<template>
  <div class="ta-center fw-bold fs-32 pt-60">{{ title }}</div>
  <div class="pt-20 pl-40 pr-40">
    <div class="pt-20" v-for="(v, i) of list" :key="i">
      <div class="d-flex ai-center">
        <div v-if="+v.required === 0" class="c-red">*</div>
        <div class="c-444 mr-10">{{ i + 1 }}.</div>
        <div class="c-444">{{ v.subject }}</div>
        <div class="c-999">[{{ v.typeTable.type }}]</div>
      </div>
      <!-- 单选题与多选题才有子级选项 -->
      <div class="mt-20" v-if="v.questionOptionsList && v.questionOptionsList.length">
        <van-radio-group v-model="v.value" v-if="v.typeId === 1">
          <van-radio class="mb-10" :name="e.questionOption" v-for="(e, j) of v.questionOptionsList" :key="j">{{ e.questionOption }}</van-radio>
        </van-radio-group>
        <van-checkbox-group v-else v-model="v.value">
          <van-checkbox class="mb-10" :name="e.questionOption" v-for="(e, j) of v.questionOptionsList" :key="j">{{ e.questionOption }}</van-checkbox>
        </van-checkbox-group>
      </div>
      <div class="mt-20" v-else>
        <textarea v-model="v.value" class="b-input pt-10 pb-10 pl-10 pr-10" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Checkbox, CheckboxGroup, RadioGroup, Radio, Toast } from 'vant'

@Options({
  components: {
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
		[RadioGroup.name]: RadioGroup,
		[Radio.name]: Radio
  },
  props: {
    list: {
      type: Array,
      default: []
    },
    title: {
      type: String
    },
    idx: {
      type: String
    }
  }
})
export default class SubjectList extends Vue {
  list: any[] = []
  idx: string = ''
  /**
   * 获取答题的数据
   * @returns 校验不通过返回false，通过返回数据
   */
  public getAnswer(): any {
    if (!this.validateAll()) {
      return false
    }
    const { list, idx } = this
    const arr = list.reduce((answer: any[], v: any) => {
      const obj = {
        questionnaireId: idx,
        questionId: v.bankIndex,
        typeId: v.typeId,
        // 多选框的时候值是数组
        answer: Array.isArray(v.value) ? v.value.join() : v.value
      }
      answer.push(obj)
      return answer
    }, [])
    return arr
  }

  /**
   * 校验是否可以提交
   * @returns 通过返回true,反之false
   */
  private validateAll(): boolean {
    const { list } = this
    // 没有值且required===0是必填
    const idx: number = list.findIndex(e => !e.value && +e.required === 0)
    // 小于0证明通过
    if (idx < 0) {
      return true
    }
    const item = list[idx]
    const type = [1, 2].includes(item.typeId) ? '选' : '填'
    Toast(`第${idx + 1}题为必${type}`)
    return false
  }
}
</script>

<style lang="less" scoped>
	textarea {
		width: 100%;
		height: 200px;
	}
</style>