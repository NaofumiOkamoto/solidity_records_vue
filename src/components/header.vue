<template>
	<div class="header">
		<router-link to="/"><img class="top_logo" src="../assets/top_logo.jpg"></router-link>
		<div class="header_icon_box">
			<button><router-link to="/">search</router-link></button>
			<button><router-link to="/home">my page</router-link></button>
			<button><router-link to="/about">cart</router-link></button>
		</div>
		<hr>
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
.top_logo{
  zoom: 60%;
	margin-left: 5%;
}
.header{
	position: relative;
}
.header_icon_box{
	position: absolute;
	top: 40%;
	right: 5%;
}
button{
	margin: 0 5px;
}
</style>