<template>
  <div class="menu f-1 d-flex fd-column o-hidden">
    <!-- <search-bar @clickOption="clickOption" /> -->
    <my-table ref="table" @click-option="clickOption" />
    <form-modal ref="formModal" v-model:visible="visible" :isAdd="isAdd" @success="success" />
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

import { IItem } from './data'

@Options({
  components: {
    FormModal,
    MyTable
  }
})
export default class Role extends Vue {
  declare $refs: {
    formModal: FormModal
    table: MyTable
  }
  private visible: boolean = false
  private isAdd: boolean = true
  
  private clickOption(data?: IItem, isAdd: boolean = true) {
    this.isAdd = isAdd
    this.visible = true
    this.$refs.formModal.initForm(data)
  }

  private success() {
    this.$refs.table.requestList()
  }
}
</script>
