<template>
  {{ counter.count }}
	<div class="home">
		<!-- <form-list /> -->
		<div class="mt-100 pl-40 pr-40 pb-40">
      <a-button
				type="primary"
			>
				提交问卷
			</a-button>
    </div>
	</div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { Vue, Options, setup } from 'vue-class-component'
import { Button } from 'ant-design-vue'
import { getUserInfo } from '@/api/user'

function useCounter () {
  const count = ref(0)

  function increment () {
    count.value++
  }
  
  onMounted(() => {
    console.log('onMounted')
  })

  return {
    count,
    increment
  }
}

@Options({
  components: {
    [Button.name]: Button
  }
})
export default class Home extends Vue {
	counter = setup(() => useCounter())
	private subjectList: any[] = []
	private info: any = {}
	private loading: boolean = false
  private error: string = ''

  async created() {
    try {
      const res = await getUserInfo()
      console.log(res)
    } catch(err) {
      console.log(err)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
	textarea {
		width: 100%;
		height: 200px;
	}
}
</style>