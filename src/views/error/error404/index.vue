<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary" @click="handleLink">
        Back Home
      </a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Result, Button } from 'ant-design-vue'

@Options({
  components: {
    [Result.name]: Result,
    [Button.name]: Button
  }
})
export default class Error404 extends Vue {
  private handleLink() {
    this.$router.replace({ path: '/' })
  }
}
</script>
