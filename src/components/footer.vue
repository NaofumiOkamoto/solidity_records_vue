<template>
	<div class="footer">
		<hr>
		<div class="footer_icon_box">
			<button><router-link to="/">facebook</router-link></button>
			<button><router-link to="/">twitter</router-link></button>
			<button><router-link to="/">instagram</router-link></button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  computed:{
  },
});
</script>

<style scoped>
button{
	margin: 0 5px;
}
.footer{
	position: relative;
	margin: 0 0 200px 0
}
.footer_icon_box{
	position: absolute;
	top: 50px;
	right: 5%;
}
</style>