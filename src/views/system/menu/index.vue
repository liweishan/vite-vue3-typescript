<template>
  <div class="menu f-1 d-flex fd-column o-hidden">
    <my-table ref="table" @clickOption="clickOption" />
    <form-modal ref="formModal" v-model:visible="visible" :isAdd="isAdd" @success="success" />
    <!-- <IconSelect /> -->
  </div>
</template>

<style lang="less" scoped>
.menu {
  background: #fff;
  padding: 20px;
  margin-bottom: 24px !important;
}

</style>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { FormModal, MyTable } from './components'
import IconSelect from '@/components/IconSelector/index.vue'

import { IItem } from './data'

@Options({
  components: {
    FormModal,
    MyTable,
    IconSelect
  }
})
export default class Menu extends Vue {
  declare $refs: {
    formModal: FormModal
    table: MyTable
  }
  private visible: boolean = false
  private isAdd: boolean = true
  
  private clickOption(data: IItem, isAdd: boolean = true) {
    this.isAdd = isAdd
    this.visible = true
    this.$refs.formModal.initForm(data)
  }

  private success() {
    this.$refs.table.success()
  }
}
</script>
