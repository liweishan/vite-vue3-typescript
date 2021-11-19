<template>
	<div>
  	<router-view />
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
	name: 'RouterView'
})
export default class RouterView extends Vue {

}
</script>
