<template>
  <div class="box">
    <pdf v-if="isPdf" :url="url" :paging="false" :panzoom="false" @render-end="renderEnd" />
    <img @load="onload" v-else :src="url" alt="">
  </div>
</template>


<script lang="ts">
import { Vue, Options } from 'vue-class-component'

import Pdf from 'coms/pdf/index.vue'

import { getFile } from 'api/archives'

import { getObjectURL } from 'utils/dom'

@Options({
  components: {
    Pdf
  }
})
export default class FilePrint extends Vue {
  private url: string = ''
  private isPdf: boolean = false

  created() {
    const { $route: { query }} = this
    this.isPdf = Number(query.isPdf) === 1
    query.url && this.requestFile(query.url + '')
  }

  private renderEnd() {
    window.print()
  }

  private onload() {
    window.print()
  }

  private async requestFile(url: string) {
    try {
      const res = await getFile(url)
      this.url = getObjectURL(res)
    } catch(e) {
      return
    }
  }
}
</script>

<style scoped lang="less">
.box {
 width: 740px;
 padding: 20px;
 margin: 0 auto;
 img {
   width: 100%;
 }
}
</style>